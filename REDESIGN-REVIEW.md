# Redesign review

Historical redesign report. Current release validation and font audit are in [DEPLOYMENT.md](DEPLOYMENT.md).

The website now uses a unified navy palette, Manrope typography, rounded controls, an asymmetric services layout, and consistent product and form surfaces. Motion provides heading and route entrances, scroll reveals, a six-scene report narrative, chart transitions, and small pointer responses. React Bits Threads provides the flowing hero background, with its upstream license retained.

Existing bilingual routes, business copy, supplied logo, synthetic data, demo availability, contact delivery logic, and metadata remain intact. See [DESIGN.md](DESIGN.md) for the visual direction and references.

The manual motion pause control and request-topic field have been removed. Contact validation and email output accept the simplified form.

## Verified

- TypeScript, ESLint, production build, and whitespace checks pass.
- All four existing contact tests pass. The synthetic fixture's row totals, period totals, percentage changes, profit bridge, and cost contributions reconcile.
- All ten routes pass at 1440, 1024, 768, 390, and 360px: 50 layout checks with correct status, heading count, language direction, and no page or product-panel overflow.
- All 25 production interaction checks pass for desktop and mobile story navigation, removal of the manual pause control and request-topic field, live reduced motion, dashboard selection, source disclosure, mobile menu and Escape/focus return, language switching, and mocked contact success/failure.
- All six Persian mobile scene anchors select the correct report. Each report fits beneath the header and leaves room for its accompanying chapter.
- Time-separated screenshots show animation changing, freezing when reduced motion is requested, and resuming afterward.
- Short screens show static scenes. Without JavaScript, accessible headings and all six static scenes remain available.
- Final production review records zero browser errors. Screenshots were inspected, including report definition, profit bridge, detail, tablet layout, Persian mobile, services, process, and contact surfaces.

## Review locally

```powershell
npm.cmd run dev -- --port 3001
```

Open `http://localhost:3001/fa` or `/en`. Reusable browser checks are in `scripts/redesign-review.js`, `scripts/redesign-interactions.js`, and `scripts/redesign-motion.js`; usage is in the README. Representative screenshots are in ignored `screenshots/`, including `redesign-final-en-desktop.png`, `redesign-final-fa-mobile.png`, and `redesign-final-fa-scene-0.png` through `redesign-final-fa-scene-5.png`.

## Scope and remaining launch configuration

No live email was sent during browser QA; contact success and failure were mocked. The Persian font license is registered and verified. Current SMTP configuration is managed in Liara, outside this repository. No public deployment was performed during this review.

The original backup is `backups/pre-redesign-20261020-002456.zip`. Archive integrity and its embedded Git HEAD were rechecked after implementation. The backup retains the previous Git HEAD. The approved redesign and simplified contact form are committed as the latest version on main.
