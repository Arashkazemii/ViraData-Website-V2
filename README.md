# ViraData website

Ten statically rendered marketing routes: five pages in Persian (`/fa`, RTL) and English (`/en`, LTR). `/` redirects to `/fa`. Next.js App Router, React, TypeScript, CSS, and Motion drive the site. The contact form uses a server route and authenticated SMTP; no CMS or demo backend is included.

## Run

```powershell
npm.cmd ci
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run start
```

Node 24 is tested. The build prerenders all ten localized routes. **The current repository is not a static export.** It needs a host that can keep a Next.js/Node.js process running; uploading `.next/` to a file-only host is not a deployment.

## Hosting and deployment (current code)

For the existing Liara NextJS application, follow [DEPLOYMENT.md](DEPLOYMENT.md). It specifies Node 24, release source, production environment settings, security findings, and the approval-gated console procedure. The generic Linux instructions below are not Liara platform settings.

The unchanged `npm run build` was tested: it succeeds and prerenders the ten marketing URLs, but does **not** create `out/`. Serving `.next/server/app` as ordinary files returned a directory listing at `/fa`, 404 at `/fa/solutions`, and 404 for `/_next/image`; `next start` returned the site at those page URLs, redirected `/` to `/fa`, and served the optimized logo, `robots.txt`, `sitemap.xml`, and social image. Do not upload `.next/server/app` or run the removed `next export` command. [Next.js static-export limitations](https://nextjs.org/docs/app/guides/static-exports) cover the current `redirects()` in `next.config.ts`, `dynamicParams: true` on both localized route segments, and the default `next/image` loader. The ten pages and the build-time `GET` social image are already prerendered; there is no marketing-site database or AI server. A static-file deployment is a possible **future code/config adaptation**, not a verified output of this repository.

Choose a Linux host with Node.js **24** (the release engine target; Next.js itself requires 20.9+), npm, SSH or an equivalent CI build facility, a persistent app process, and HTTPS termination/reverse proxy through Nginx, Apache, or the provider. File-only/PHP-only shared hosting is insufficient. Next.js has no fixed RAM/CPU minimum for this project; confirm the provider permits a production build and sustained process before purchase. Allow headroom for build-time workers and the `public/` assets (currently about 10 MB); 2 GB RAM or more is a prudent starting point, **not a measured guarantee**. Build on the Linux host or Linux CI rather than uploading Windows-built `node_modules`/`.next`.

After copying this repository to the host (example path `/srv/viradata/website`), use these commands in a POSIX shell. Set SMTP credentials in the host environment and final logo path only if confirmed. `NEXT_PUBLIC_*` settings and prerendered metadata are fixed at **build time**, so rebuild after changing them.

```sh
cd /srv/viradata/website
export NEXT_PUBLIC_SITE_ORIGIN=https://viradataco.com
npm ci
npm run build
npm run typecheck
npm run lint
npm run start -- -H 127.0.0.1 -p 3000
```

The final command must be supervised by the host's process manager (for example systemd or its Node app manager); do not leave it attached to an SSH session. Route public HTTPS traffic to `127.0.0.1:3000` with a reverse proxy. Configure TLS certificates for the chosen hostname, redirect HTTP to HTTPS, and redirect the alternate `www`/apex hostname to **one** canonical origin. Do not expose port 3000 publicly. Check `/`, all ten localized URLs, `/_next/image`, `/robots.txt`, `/sitemap.xml`, `/social-image`, and a missing URL after deployment. Never deploy the site with `NEXT_PUBLIC_SITE_ORIGIN` unset if it is meant to be indexed.

For `viradataco.com`, use `NEXT_PUBLIC_SITE_ORIGIN=https://viradataco.com` only after confirming domain control and HTTPS on that exact hostname. It produces absolute canonicals, reciprocal `hreflang`, social URLs, and ten sitemap entries at build time; `robots.txt` then allows crawling and pages permit indexing. With the variable unset or invalid, the existing safe state remains: page `noindex`, `robots.txt` disallows `/`, sitemap is empty, and canonicals are omitted. Keep nonpublic previews in that safe state or access-controlled. A runtime-only environment change does **not** regenerate these static metadata files. Contact submission reports an error until SMTP is configured and accepts the message. Both demo links remain `planned` until separately tested. IRANYekanX is registered for ViraData under license `21LDVTC6`: https://fontiran.com/license/21LDVTC6.

`npm audit --omit=dev` reports zero production advisories. The full audit reports five high advisories in the ESLint dependency chain (`braces` → `micromatch` → `fast-glob`). Its suggested forced fix downgrades `eslint-config-next` to 14, incompatible with this Next.js 16 setup; review when compatible upstream versions are available.

## Structure and edits

- `lib/copy.ts`: all bilingual page copy, navigation, accessibility labels, and metadata text. The supplied `ViraData-Website-Content-v1.md` remains the editorial reference. The site adds short section labels and conceptual visual labels, without changing material claims.
- `components/pages.tsx`: page compositions. `components/motion-system.tsx`: hydration-safe motion preferences. `components/decision-story.tsx`: scroll narrative and product previews. `app/globals.css` and `app/experience.css`: structural styles; `app/polish.css`: the current visual layer. `components/signature-motion.tsx`: hero atmosphere and pointer response.
- `lib/config.ts`: demo status and URLs, plus origin and logo settings.
- `public/logo-1.png`: supplied symbol used in the header and About visual. `public/logo-2.png`: supplied symbol/wordmark image used in the social image. Both are dark transparent assets. Confirm which is the approved final version before launch. `NEXT_PUBLIC_LOGO_PATH` changes the header mark; update `app/social-image/route.tsx` and the About visual if replacing the artwork. No new logo was created.
- `palette-preview/`: local four-palette comparison and reviewed screenshots. Follow its README to run it. These files are excluded from the Liara source package and are not served by the website.

## Publication settings

Copy `.env.example` to `.env.local` and fill only confirmed values.

- `NEXT_PUBLIC_SITE_ORIGIN`: final public HTTPS origin. Without it, pages and `robots.txt` remain `noindex`/disallowed, the sitemap is empty, and no canonical is emitted. Do not set it to a preview, localhost, or an unowned domain. The origin is used for canonicals, reciprocal `hreflang`, sitemap, and social metadata.
- `SMTP_HOST`: SMTP server hostname.
- `SMTP_PORT`: SMTP port, usually `465` or `587`.
- `SMTP_SECURE`: `true` for implicit TLS on port `465`; `false` for STARTTLS on port `587` (TLS is required).
- `SMTP_USER`: SMTP authentication username.
- `SMTP_PASS`: SMTP authentication password or app password.
- `SMTP_FROM`: sender address verified and authorized by the SMTP provider. Visitor email is used only in `Reply-To`.

The contact form has no topic field. It sends a general email to `vp.sales@viradataco.com` and sets the visitor as Reply-To. Keep SMTP variables server-side in Liara's application environment settings. `SMTP_FROM` may differ from the recipient; retain the provider-authorized sender already configured there. Do not prefix SMTP values with `NEXT_PUBLIC_` or commit them. Keep Liara's **NextJS** platform, select **Node 24**, and retain `npm run build` and `npm run start`; use the source-upload procedure in [DEPLOYMENT.md](DEPLOYMENT.md). Match Liara's HTTP port to the process port (3000 by default). Set the verified public `NEXT_PUBLIC_SITE_ORIGIN` before building. After deployment, confirm a real request reaches the target mailbox. SMTP acceptance alone does not prove final inbox delivery. The in-memory rate limit allows five valid attempts per client IP per ten minutes per process; a scaled deployment needs shared rate limiting if stronger protection is required.
- `NEXT_PUBLIC_LOGO_PATH`: path to the approved header asset under `public/`, beginning with `/`.

Demo availability is independent of copy. Edit `demos` in `lib/config.ts` (`planned | preview | live`) and add an HTTPS URL only after testing public access. Both workstreams currently say `planned` and have no launch links. If publishing a preview, verify its data source, accessibility, and public permissions; label synthetic data and any local interpreter inside the demo too. Do not call an unconnected preview AI or PostgreSQL backed.

## SEO and safety

Each localized route has distinct metadata and rendered HTML. The configured origin controls canonical URLs, `hreflang`, `sitemap.xml`, `robots.txt`, Open Graph, and Twitter metadata. The social image uses the supplied logo variant. Indexing stays disabled until a final HTTPS origin is configured. There are no unverified organization facts in structured data.

## Before public launch

Confirm final logo variant and usage rights; final domain and hosting; working contact email or endpoint; public demo URLs and status. Search Console setup follows deployment. No public deployment is included here.

## Design and motion

The current design uses a consistent navy palette, silver text, blue accents, self-hosted Manrope for English, and the supplied IRANYekanX FaNum variable font for Persian. See [DESIGN.md](DESIGN.md) for the design direction and references. The original content, routes, logo, demo status, metadata, and contact delivery behavior are preserved.

- [Motion](https://motion.dev/docs/react-scroll-animations) drives word entrances, route entrances, scroll reveals, the six-scene data story, report transitions, chart transforms, and small pointer responses. Scrolling remains native.
- [React Bits Threads](https://reactbits.dev/backgrounds/threads) supplies the hero's flowing signal. Its inspected TS/CSS source is in `components/react-bits/`, with the upstream license. It adds no runtime dependency. Local adaptations support live reduced-motion changes and React's ref lifecycle.
- Continuous work stops outside the viewport and in hidden tabs. There is no manual motion pause control. Reduced motion presents all six static scenes; short screens also use static scenes. All content is available in server-rendered HTML without JavaScript.
- Accessible headings retain complete text for screen readers. Persian words retain shaping, RTL order, and independent sizing. The mobile menu supports Escape, focus return, and outside dismissal.
- The header, services, report, process, previews, form, and footer share one material palette and consistent corner radii.

Only the active Persian variable font and its original license notice remain in `public/fonts/iranyekan/`. The 130 unused vendor-package assets were removed from deployment and retained in ignored local backups. Fontiran confirms license `21LDVTC6` for ViraData and `viradataco.com`. The original notice contains the genuine ID, the CSS includes attribution, and the footer links the official verification badge.

## Data story and previews

`lib/story-data.ts` is the single synthetic fixture shared by Home, Solutions, and Demos. Amounts are millions of tomans. Two fictional periods, three products, and the assumption that all purchases are sold. Inventory, tax, interest, and depreciation are excluded. `lib/story-copy.ts` contains bilingual labels, assumptions, and the fictional source passage.

`components/decision-story.tsx` contains six report states: source rows, metric definition, comparative report, profit reconciliation, product detail, and next investigation. Dashboard buttons select predefined report/insight/detail views. Assistant citations open the fictional source passage. Neither preview is connected to AI or a database. Both public demo statuses remain `planned`.

## Verify

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
node --import tsx scripts/check-story.mjs
npm.cmd run build
npm.cmd run start -- --port 3002
playwright-cli -s=viradata_review open --browser=chrome http://localhost:3002/en
playwright-cli -s=viradata_review resize 1440 1000
playwright-cli -s=viradata_review run-code --filename=scripts/redesign-review.js
playwright-cli -s=viradata_review resize 390 844
playwright-cli -s=viradata_review run-code --filename=scripts/redesign-review.js
playwright-cli -s=viradata_review run-code --filename=scripts/redesign-interactions.js
playwright-cli -s=viradata_review run-code --filename=scripts/redesign-motion.js
playwright-cli -s=viradata_review close
```

The browser review uses the open page's origin. Desktop mode checks 1440, 1024, and 768px; mobile mode checks 390 and 360px. It visits all ten routes, checks HTTP status, headings, RTL/LTR, page and panel overflow, and browser errors. Screenshots are saved under ignored `screenshots/`.

Additional review covers all report stages, menu and language navigation, live reduced motion, animation frame changes, short screens, source disclosure, and mocked contact success/failure. No real contact email is sent by browser QA.

## Backup and review

The verified original source backup is `backups/pre-redesign-20261020-002456.zip`. Its embedded manifest records the original Git HEAD. Dependencies, generated output, screenshots, caches, and Git metadata are excluded. Backups stay local and are ignored by Git. The approved redesign is the latest version on main. No public deployment was performed.
