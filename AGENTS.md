# Project instructions

## Communication and execution

- At the start of each session, read the installed caveman skill and apply full mode to agent communication. Preserve complete code, technical accuracy, essential assumptions, errors, and validation evidence.
- Follow explicit user requests for detailed explanations or another style.
- Proceed autonomously with routine, reversible work within the task scope.
- Ask only when missing information materially affects correctness or an action requires authorization. Resolve minor choices using judgment.
- Avoid trivial questions, repeated plans, unnecessary narration, and unrelated work. Complete the requested task.
- Run checks appropriate to the change. Repeat only after changes, failures, or unresolved concerns.

## RTK

- Use RTK for supported shell commands. This is required, not optional.
- Run PowerShell built-ins and unsupported commands directly.
- Use raw output when filtered output omits details needed for correctness.
- Do not repeatedly retry a failing RTK wrapper; use the underlying command.

## Graphify

- For repository code work, read the installed graphify skill.
- Query a current project graph before broad repository exploration.
- If no graph exists and broad exploration is needed, build a local code-only graph for the relevant project or subtree.
- Exclude dependencies, generated files, datasets, caches, and binaries.
- Do not index the entire user profile or unrelated directories.
- Refresh affected graph content after relevant code changes.
- Use graph results to locate code, then read the source needed for the task.
- Do not call semantic API backends unless authorized.
- If Graphify fails, report the limitation briefly and continue with targeted source searches.

## Frontend and React Bits

- Read project instructions, dependencies, and existing design context first.
- Preserve the existing visual identity for scoped fixes.
- Follow explicit requirements for branding, RTL/LTR, themes, and motion.
- Use React Bits selectively when its components fit the requested result.
- Read the selected component's official instructions and inspect its dependencies before adding it.
- Match the project's language and styling approach. Do not introduce Tailwind solely to use one component in a CSS-based project.
- Do not install Taste, Impeccable, Awesome DESIGN.md, 21st MCP, or Motion unless the user explicitly requests them.
- Check transitive dependencies too; choose a suitable alternative if a React Bits component would introduce Motion.
- Preserve existing project dependencies unless changing them is in scope.
- Respect reduced motion, keyboard access, contrast, and SSR constraints where applicable. Avoid unnecessary animation and rendering work.

## Browser verification

- Use the installed playwright-cli skill for relevant browser checks.
- Use the installed system Chrome with --browser=chrome.
- Do not retry the blocked Chromium download.
- Use named browser sessions and close sessions created for the task.
- Verify changed behavior at relevant desktop and mobile viewport sizes.
- Inspect screenshots and relevant browser errors; capturing a screenshot alone does not establish visual correctness.
- For animation changes, inspect motion over time as well as static layout.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
