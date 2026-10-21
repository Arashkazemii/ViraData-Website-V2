# Local palette comparison

The four color studies use the current website pages and layout. They are local design artifacts, outside Next.js `public` and excluded from the Liara source package. The production site keeps its current colors, including when a `palette` query parameter is supplied.

Run in two terminals from the repository root:

```powershell
npm run dev
node palette-preview/server.mjs
```

Open `http://127.0.0.1:3001/palette-comparison.html`. The local server proxies the website on port 3000 without changing its HTML. The comparison and full-size pages apply the study stylesheet inside their own iframes after load. To compare a production build locally, run `npm run build` and `npm run start` in the first terminal instead.

Select a section, language, width, and form state. The success and error examples are visual only; they never submit the contact form. Palette IDs: `navy-teal`, `warm-charcoal`, `forest-green`. With no ID, the current palette is shown.

The `captures/` directory retains the reviewed Persian and English desktop and mobile comparisons, including solution cards and contact form states. To refresh them after content or layout changes, open the comparison in a named system Chrome Playwright CLI session and run `playwright-cli --session=<name> run-code --filename=palette-preview/capture.js`.
