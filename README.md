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

Node 24 is tested. The build prerenders all ten localized routes. Deploy to a host that supports Next.js 16 and its redirects, metadata routes, and image optimization. A static file host alone needs an export adaptation.

`npm audit --omit=dev` reports zero production advisories. The full audit reports five high advisories in the ESLint dependency chain (`braces` → `micromatch` → `fast-glob`). Its suggested forced fix downgrades `eslint-config-next` to 14, incompatible with this Next.js 16 setup; review when compatible upstream versions are available.

## Structure and edits

- `lib/copy.ts`: all bilingual page copy, navigation, accessibility labels, and metadata text. The supplied `ViraData-Website-Content-v1.md` remains the editorial reference. The site adds short section labels and conceptual visual labels, without changing material claims.
- `components/pages.tsx`: page compositions. `components/motion-system.tsx`: Motion orchestration, pause control, and SVG data diagram. `app/globals.css`: design tokens, layouts, and responsive styles.
- `lib/config.ts`: demo status and URLs, plus origin, email, and logo settings.
- `public/logo-1.png`: supplied symbol used in the header and About visual. `public/logo-2.png`: supplied symbol/wordmark image used in the social image. Both are dark transparent assets. Confirm which is the approved final version before launch. `NEXT_PUBLIC_LOGO_PATH` changes the header mark; update `app/social-image/route.tsx` and the About visual if replacing the artwork. No new logo was created.

## Publication settings

Copy `.env.example` to `.env.local` and fill only confirmed values.

- `NEXT_PUBLIC_SITE_ORIGIN`: final public HTTPS origin. Without it, pages and `robots.txt` remain `noindex`/disallowed, the sitemap is empty, and no canonical is emitted. Do not set it to a preview, localhost, or an unowned domain. The origin is used for canonicals, reciprocal `hreflang`, sitemap, and social metadata.
- `NEXT_PUBLIC_CONTACT_EMAIL`: configure only after a real receipt test. Without it, the contact form is visibly unavailable and its fields are disabled. With it, browser validation runs and the button opens the visitor's email app with a prepared message. The user completes sending there; the site never claims receipt or stores the message.
- `NEXT_PUBLIC_LOGO_PATH`: path to the approved header asset under `public/`, beginning with `/`.

Demo availability is independent of copy. Edit `demos` in `lib/config.ts` (`planned | preview | live`) and add an HTTPS URL only after testing public access. Both workstreams currently say `planned` and have no launch links. If publishing a preview, verify its data source, accessibility, and public permissions; label synthetic data and any local interpreter inside the demo too. Do not call an unconnected preview AI or PostgreSQL backed.

## SEO and safety

Each localized route has distinct metadata and rendered HTML. The configured origin controls canonical URLs, `hreflang`, `sitemap.xml`, `robots.txt`, Open Graph, and Twitter metadata. The social image uses the supplied logo variant. Indexing stays disabled until a final HTTPS origin is configured. There are no unverified organization facts in structured data.

## Before public launch

Confirm final logo variant and usage rights; final domain and hosting; working contact email or endpoint; public demo URLs and status. Search Console setup follows deployment. No public deployment is included here.

## Design sources

Motion is installed from its [official React package](https://motion.dev/docs/react-installation). [React Bits](https://www.reactbits.dev/get-started/index) was reviewed, but no component fit the site better than the bespoke SVG/CSS compositions; none was installed. Inter and Vazirmatn are locally bundled from Fontsource and use OFL licensed font files.
