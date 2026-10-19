# ViraData website

Ten statically rendered marketing routes: five pages in Persian (`/fa`, RTL) and English (`/en`, LTR). `/` redirects to `/fa`. Next.js App Router, React, TypeScript, CSS, and Motion drive the site. No CMS, customer data, or demo backend is included.

## Run

```powershell
npm.cmd ci
npm.cmd run dev
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd run start
```

Node 24 is tested. The build prerenders all ten localized routes. **The current repository is not a static export.** It needs a host that can keep a Next.js/Node.js process running; uploading `.next/` to a file-only host is not a deployment.

## Hosting and deployment (current code)

The unchanged `npm run build` was tested: it succeeds and prerenders the ten marketing URLs, but does **not** create `out/`. Serving `.next/server/app` as ordinary files returned a directory listing at `/fa`, 404 at `/fa/solutions`, and 404 for `/_next/image`; `next start` returned the site at those page URLs, redirected `/` to `/fa`, and served the optimized logo, `robots.txt`, `sitemap.xml`, and social image. Do not upload `.next/server/app` or run the removed `next export` command. [Next.js static-export limitations](https://nextjs.org/docs/app/guides/static-exports) cover the current `redirects()` in `next.config.ts`, `dynamicParams: true` on both localized route segments, and the default `next/image` loader. The ten pages and the build-time `GET` social image are already prerendered; there is no marketing-site database or AI server. A static-file deployment is a possible **future code/config adaptation**, not a verified output of this repository.

Choose a Linux host with Node.js **20.9+** (Node 24 tested), npm, SSH or an equivalent CI build facility, a persistent app process, and HTTPS termination/reverse proxy through Nginx, Apache, or the provider. File-only/PHP-only shared hosting is insufficient. Next.js has no fixed RAM/CPU minimum for this project; confirm the provider permits a production build and sustained process before purchase. Allow headroom for build-time workers and the `public/` assets (currently about 10 MB); 2 GB RAM or more is a prudent starting point, **not a measured guarantee**. Build on the Linux host or Linux CI rather than uploading Windows-built `node_modules`/`.next`.

After copying this repository to the host (example path `/srv/viradata/website`), use these commands in a POSIX shell. Set the verified contact email and final logo path only if confirmed; they are optional. `NEXT_PUBLIC_*` settings and prerendered metadata are fixed at **build time**, so rebuild after changing them.

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

For `viradataco.com`, use `NEXT_PUBLIC_SITE_ORIGIN=https://viradataco.com` only after confirming domain control and HTTPS on that exact hostname. It produces absolute canonicals, reciprocal `hreflang`, social URLs, and ten sitemap entries at build time; `robots.txt` then allows crawling and pages permit indexing. With the variable unset or invalid, the existing safe state remains: page `noindex`, `robots.txt` disallows `/`, sitemap is empty, and canonicals are omitted. Keep nonpublic previews in that safe state or access-controlled. A runtime-only environment change does **not** regenerate these static metadata files. Contact remains unavailable until `NEXT_PUBLIC_CONTACT_EMAIL` is verified; both demo links remain `planned` until separately tested. Verify the proprietary IRANYekanX license-code placeholder in `public/fonts/` before publishing the supplied font package.

`npm audit --omit=dev` reports zero production advisories. The full audit reports five high advisories in the ESLint dependency chain (`braces` → `micromatch` → `fast-glob`). Its suggested forced fix downgrades `eslint-config-next` to 14, incompatible with this Next.js 16 setup; review when compatible upstream versions are available.

## Structure and edits

- `lib/copy.ts`: all bilingual page copy, navigation, accessibility labels, and metadata text. The supplied `ViraData-Website-Content-v1.md` remains the editorial reference. The site adds short section labels and conceptual visual labels, without changing material claims.
- `components/pages.tsx`: page compositions. `components/motion-system.tsx`: hydration-safe motion preferences and header pause control. `components/decision-story.tsx`: scroll narrative and product previews. `app/globals.css` and `app/experience.css`: shared styles and the redesigned experience.
- `lib/config.ts`: demo status and URLs, plus origin, email, and logo settings.
- `public/logo-1.png`: supplied symbol used in the header and About visual. `public/logo-2.png`: supplied symbol/wordmark image used in the social image. Both are dark transparent assets. Confirm which is the approved final version before launch. `NEXT_PUBLIC_LOGO_PATH` changes the header mark; update `app/social-image/route.tsx` and the About visual if replacing the artwork. No new logo was created.

## Publication settings

Copy `.env.example` to `.env.local` and fill only confirmed values.

- `NEXT_PUBLIC_SITE_ORIGIN`: final public HTTPS origin. Without it, pages and `robots.txt` remain `noindex`/disallowed, the sitemap is empty, and no canonical is emitted. Do not set it to a preview, localhost, or an unowned domain. The origin is used for canonicals, reciprocal `hreflang`, sitemap, and social metadata.
- `NEXT_PUBLIC_CONTACT_EMAIL`: configure only after a real receipt test. Without it, a compact unavailable state replaces the form. With it, browser validation runs and the button opens the visitor's email app with a prepared message. The user completes sending there; the site never claims receipt or stores the message.
- `NEXT_PUBLIC_LOGO_PATH`: path to the approved header asset under `public/`, beginning with `/`.

Demo availability is independent of copy. Edit `demos` in `lib/config.ts` (`planned | preview | live`) and add an HTTPS URL only after testing public access. Both workstreams currently say `planned` and have no launch links. If publishing a preview, verify its data source, accessibility, and public permissions; label synthetic data and any local interpreter inside the demo too. Do not call an unconnected preview AI or PostgreSQL backed.

## SEO and safety

Each localized route has distinct metadata and rendered HTML. The configured origin controls canonical URLs, `hreflang`, `sitemap.xml`, `robots.txt`, Open Graph, and Twitter metadata. The social image uses the supplied logo variant. Indexing stays disabled until a final HTTPS origin is configured. There are no unverified organization facts in structured data.

## Before public launch

Confirm final logo variant and usage rights; final domain and hosting; working contact email or endpoint; public demo URLs and status. Search Console setup follows deployment. No public deployment is included here.

## Design sources

Motion is installed from its [official React package](https://motion.dev/docs/react-installation). English Inter remains bundled from Fontsource. Persian uses the owner-provided proprietary IRANYekanX FaNum variable WOFF2 at `public/fonts/iranyekan/IRANYekanXVFaNumVF.woff2` (actual `wght` axis: 100–1000), with `font-display: swap`, a Tahoma/Arial fallback, and synthetic font styles disabled. The supplied font package and license note are in `public/fonts/`; its `FontLicense.txt` still has a blank license-code placeholder, which the owner must resolve before publication.

## Request-to-decision redesign

- `lib/story-data.ts`: the single synthetic fixture and derived calculations shared by Home, Solutions, and Demos. Amounts are **millions of tomans**. Two equal-length fictional periods; three products; all purchased units are sold. Inventory, tax, interest and depreciation are outside this deliberately simplified model.
- `lib/story-copy.ts`: bilingual story, report labels, assumptions and fictional purchasing document. Original editorial copy remains in `lib/copy.ts`.
- `components/decision-story.tsx`: six report states (source rows, metric definition, comparative report, profit reconciliation, product detail, next investigation), shared report UI, two distinct product previews, and a method ledger.
- `app/experience.css`: the redesign layer over the existing shared CSS. Persian headings have independent sizing and no negative tracking.
- Normal scrolling selects report states, forwards or backwards. Stage anchors support keyboard navigation and equivalent language links. The hero report also responds subtly to scroll; selected method-ledger rows progress as the document enters view. There are no infinite animation loops.
- Pause and reduced motion display all six static scenes. Screens at most 700px tall also use the static layout. All scenes and primary marketing copy are rendered into HTML before JavaScript. Motion preferences use a server-consistent first render to avoid hydration mismatches. The motion control is in the fixed header.
- Dashboard preview buttons select predefined report/insight/detail views. Assistant citation opens a fictional source passage. Neither is a live AI demo, interpreter, or database-backed product. Both demo statuses remain `planned` in `lib/config.ts`.
- Contact shows a compact unavailable state when no verified email is configured; the validated email-client flow remains available when configured.

### Component decision and copy changes

Reviewed the current [React Bits Stepper](https://reactbits.dev/components/stepper) and [installation instructions](https://reactbits.dev/get-started/installation). Stepper's form-like next/back progression would duplicate the scene state and require adaptation for native-scroll tracking, SSR-visible chapters, and reduced-motion reading. A focused Motion implementation using [useScroll](https://motion.dev/docs/react-use-scroll) fits those constraints directly. No React Bits component was installed or copied. No project dependency was added for this redesign; Prettier was run as a temporary formatting tool.

The new fictional financial scenario and purchasing passage are illustrative additions, not client claims. The home primary action now opens the story; the original solutions/contact actions remain. Repeated closing CTAs were replaced with page-specific endings. Dashboard limitation copy was corrected in both languages: this preview has predefined views, **no local natural-language interpreter**, AI, or database connection. No original business claims were strengthened.

### Verification

```powershell
node scripts/check-story.mjs
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
playwright-cli -s=viradata_review open --browser=chrome http://localhost:3000/fa
playwright-cli -s=viradata_review run-code --filename=scripts/browser-review.js
playwright-cli -s=viradata_review close
```

The fixture check verifies row totals, period totals, percentage changes, the complete profit bridge and the largest product cost contribution. The browser review visits all ten routes at 1440, 768, 390 and 360px; checks HTTP status, H1 and overflow; records console errors and screenshots. Additional manual browser checks cover time-sampled transitions, reduced motion, pause, short screens, keyboard navigation, source disclosure, language/section preservation, and production HTML without JavaScript. Local captures are under ignored `screenshots/`, including `final-fa-scene-0.png` through `final-fa-scene-5.png` and `final-fa-detail-mobile.png`.
