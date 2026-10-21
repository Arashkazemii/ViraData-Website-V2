param([string]$OutputDirectory = "backups")

$ErrorActionPreference = "Stop"
$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")).Path
Set-Location -LiteralPath $root
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$commit = (& git rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) { throw "Cannot read commit" }
$tracked = @(& git -c core.quotePath=false ls-tree -r --name-only HEAD)
if ($LASTEXITCODE -ne 0) { throw "Cannot list committed files" }
$rootFiles = @("package.json", "package-lock.json", "next.config.js", "next-env.d.ts", "tsconfig.json")
$files = @($tracked | Where-Object {
  $_ -in $rootFiles -or $_ -match '^(app|components|lib|public)/'
} | Sort-Object -Unique)
if ($files.Count -lt 20) { throw "Unexpectedly small source package" }
foreach ($path in $files) {
  if ($path -match '(^|/)(\.env|palette-preview|screenshots|node_modules|backups|\.next)(/|\.|$)' -or
      $path -match '\.(zip|sha256|tmp)$') { throw "Disallowed path: $path" }
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Missing committed file: $path" }
}

$output = if ([IO.Path]::IsPathRooted($OutputDirectory)) { $OutputDirectory } else { Join-Path $root $OutputDirectory }
New-Item -ItemType Directory -Path $output -Force | Out-Null
$date = Get-Date -Format "yyyyMMdd"
$stem = "liara-production-source-$date"
$zipPath = Join-Path $output "$stem.zip"
$manifestPath = Join-Path $output "$stem.manifest.json"
$shaPath = Join-Path $output "$stem.sha256"
$entries = @($files | ForEach-Object {
  [ordered]@{
    path = $_.Replace('\', '/')
    sha256 = (Get-FileHash -LiteralPath $_ -Algorithm SHA256).Hash.ToLowerInvariant()
  }
})
$inside = [ordered]@{
  commit = $commit
  platform = "Liara NextJS"
  files = $entries
}
$insideJson = $inside | ConvertTo-Json -Depth 8
$utf8 = New-Object System.Text.UTF8Encoding($false)
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath }
$archive = [IO.Compression.ZipFile]::Open($zipPath, [IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($item in $entries) {
    $source = Join-Path $root ($item.path.Replace('/', [IO.Path]::DirectorySeparatorChar))
    [void][IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $source, $item.path, [IO.Compression.CompressionLevel]::Optimal)
  }
  $manifestEntry = $archive.CreateEntry("_release-manifest.json", [IO.Compression.CompressionLevel]::Optimal)
  $writer = New-Object IO.StreamWriter($manifestEntry.Open(), $utf8)
  try { $writer.Write($insideJson) } finally { $writer.Dispose() }
} finally { $archive.Dispose() }

$zipHash = (Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash.ToLowerInvariant()
$outside = [ordered]@{
  commit = $commit
  platform = "Liara NextJS"
  fileCount = $entries.Count
  zip = [IO.Path]::GetFileName($zipPath)
  zipSha256 = $zipHash
  files = $entries
}
[IO.File]::WriteAllText($manifestPath, ($outside | ConvertTo-Json -Depth 8), $utf8)
[IO.File]::WriteAllText($shaPath, "$zipHash  $([IO.Path]::GetFileName($zipPath))`n", $utf8)

$verify = [IO.Compression.ZipFile]::OpenRead($zipPath)
try {
  if ($verify.Entries.Count -ne $entries.Count + 1) { throw "ZIP entry count mismatch" }
  $expected = @{}
  foreach ($item in $entries) { $expected[$item.path] = $item.sha256 }
  foreach ($entry in $verify.Entries) {
    if ($entry.FullName -eq "_release-manifest.json") {
      $reader = New-Object IO.StreamReader($entry.Open(), $utf8)
      try { $actualInside = $reader.ReadToEnd() | ConvertFrom-Json } finally { $reader.Dispose() }
      if ($actualInside.commit -ne $commit -or $actualInside.files.Count -ne $entries.Count) { throw "Internal manifest mismatch" }
      continue
    }
    if (-not $expected.ContainsKey($entry.FullName)) { throw "Unexpected ZIP entry: $($entry.FullName)" }
    $stream = $entry.Open()
    $hasher = [Security.Cryptography.SHA256]::Create()
    try { $actual = [BitConverter]::ToString($hasher.ComputeHash($stream)).Replace('-', '').ToLowerInvariant() }
    finally { $stream.Dispose(); $hasher.Dispose() }
    if ($actual -ne $expected[$entry.FullName]) { throw "ZIP hash mismatch: $($entry.FullName)" }
    $expected.Remove($entry.FullName)
  }
  if ($expected.Count -ne 0) { throw "ZIP missing $($expected.Count) source files" }
} finally { $verify.Dispose() }
if ((Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $zipHash) { throw "ZIP SHA-256 mismatch" }

Write-Output "Commit: $commit"
Write-Output "Source files: $($entries.Count)"
Write-Output "ZIP entries including internal manifest: $($entries.Count + 1)"
Write-Output "ZIP: $zipPath"
Write-Output "Manifest: $manifestPath"
Write-Output "SHA-256: $zipHash"
Write-Output "Sidecar: $shaPath"
Write-Output "Verified: every ZIP entry and archive hash"
