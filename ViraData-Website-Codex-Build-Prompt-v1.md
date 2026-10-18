# پرامپت آماده برای Codex لپ‌تاپ — وب‌سایت ViraData

این فایل را همراه `ViraData-Website-Content-v1.md` در پوشه پروژه بگذار. متن زیر را عیناً به Codex بده:

---

You are implementing the public ViraData marketing website in the current project folder. Complete the runnable implementation, not just a plan or a single hero. Read `AGENTS.md`, inspect the directory and existing assets, and read `ViraData-Website-Content-v1.md` in full before editing. The owner will put the final logo in the project; locate it, inspect variants and proportions, and integrate the actual asset. If it is not present yet, make the brand component accept a configurable asset path and use a text fallback; report the missing logo clearly. Never invent a logo or claim an unrelated image is final.

## Objective and current truth

ViraData is an executive consulting practice that designs and implements data, AI, analytics, and automation solutions around customer problems. Audience is not restricted to factories: industrial, commercial, financial, and service organizations may all be relevant. The public site needs to feel premium, bold, modern, and unusually well crafted, with rich motion and distinctive visual storytelling. It must remain readable, fast, accessible, and credible. The two demos are an intelligent dashboard and an AI assistant; they are separate workstreams. Do not imply either is live until it is actually integrated and tested. A previous private ChatGPT Site preview exists, but this local project is the source for the new implementation; do not copy that preview blindly.

Use the supplied content file as the editorial source of truth. Preserve its meaning and bilingual copy; refine minor wording only when needed for fit or natural English, and record any material copy change. Do not invent client logos, testimonials, awards, certifications, founded date, office, published team members, performance numbers, or guarantees. Do not mention the owner's employer or turn prior employment into ViraData case studies. Sample data and conceptual imagery must be labeled clearly.

## Pages and content

Build the complete five-page site in both Persian and English:

- `/fa`, `/en`: Home
- `/fa/solutions`, `/en/solutions`: Solutions, with assistant, analytics, and decision-support anchors
- `/fa/demos`, `/en/demos`: Demos, with dashboard and assistant cards, honest status, and launch links only when verified
- `/fa/about`, `/en/about`: About
- `/fa/contact`, `/en/contact`: Contact

`/` should select Persian without breaking indexability. Add localized 404. All text, navigation, validation, chart labels if any, metadata, accessibility labels, and motion controls must be localized. Persian is RTL; English is LTR. Switching languages should preserve the equivalent page and section when possible. Use typographic and CSS logical properties correctly, and isolate emails, URLs, and mixed-script fragments.

Implement every section and the exact business concepts in the content file. In Home, the rhythm should be: cinematic introduction → concrete business problems → three solution families → how collaboration works → honest demo preview → decisive contact CTA. Interior pages should have their own compositions and visual moments, not repeat the same grid of rounded cards five times. Give the Solutions page substantial content; Demos should show synthetic/preview/live status from one configuration source. Contact should have a functioning channel, or an explicitly unavailable state with a working mail client fallback only if the email address is verified. Never simulate form success.

## Art direction — make it memorable

Create an original visual system inspired by the idea of **data becoming a clear decision**. The approved logo anchors the identity. Explore a sophisticated dark graphite/navy base, warm off-white typography, precise cobalt/electric-blue highlights, and restrained secondary accents derived from the actual logo. Use generous negative space, strong editorial typography, layered depth, fine lines, data paths, beautifully paced section transitions, and a few bespoke diagrams/visualizations. The look must feel like a serious design studio and technical consultancy, not a generic SaaS template, neon crypto landing page, or pile of glass cards. A light treatment may be used for a carefully chosen section if it improves pacing; do not add an unrequested theme switch.

I explicitly want **a lot of good animation**. Build a coherent motion language across the whole experience, with many polished interactions rather than a single animated hero:

1. Hero entrance: purposeful typography reveal, logo/navigation arrival, animated data threads or a bespoke abstract system showing raw signals organizing into a decision, and a refined supporting panel. No compulsory long intro or loading gate.
2. Scroll storytelling: layered but restrained reveals, diagrams whose states progress with the section, subtle line drawing, masked section headings, and changing visual focus. Use native scrolling; avoid scroll hijacking.
3. Interaction: magnetic-feeling but accessible CTA feedback, elegant link underlines, card state changes, animated tabs/accordions where useful, responsive mobile navigation, and navigation transitions that do not break history or focus.
4. Data visuals: coherent numbers and labels with small, purposeful transitions. Never present arbitrary animation as a factual business result.
5. Polish: section-to-section rhythm, smooth timing, carefully tuned easing, hover and focus parity, deliberate mobile variants, and an ending that visually resolves the opening idea.

Animation must support meaning. Avoid nonstop random particles, giant text splitting on every paragraph, excessive parallax, cursor trails, continuous float on all cards, unreadable 3D effects, and excessive layout shifts. Limit heavy work to a few hero/feature areas, animate transforms/opacity where practical, pause offscreen loops, and keep important content visible even if JS or animations fail. Implement `prefers-reduced-motion` comprehensively, a pause control for prolonged automatic motion, keyboard operability, and static fallbacks. Test on a modest laptop as well as desktop viewport. If video assets exist, inspect licensing/source and use only suitable ones; the site must look complete without video. Do not fetch a random stock video solely to fill the hero.

Use Motion in this project (`npm install motion`; imports from `motion/react`) for orchestration and interaction. React Bits is a source of *selective, editable components*, not a global package or MCP. Browse its current component catalog and installation instructions before choosing any component. If a suitable current component genuinely improves the design, add its TypeScript/CSS variant via the documented `npx shadcn@latest add @react-bits/<ComponentName>-TS-CSS` pattern, inspect dependencies, adapt styling/accessibility, and keep a short note of its provenance. Do not install a paid tier or scatter many unmodified effects across the site. If a bespoke CSS/SVG/Motion component is better, build that instead. Check current official package documentation and version compatibility before installing; do not assume my tool version list pins package versions.

## Technical implementation

The laptop has Codex CLI 0.163.0, Node 24.19.0, npm 12.2.0, Git 2.55.0.windows.3, Python 3.14.3, uv 0.12.3, RTK 0.45.0, Graphify 0.9.92 plus skill, Playwright CLI 0.1.22 plus skill, Caveman skill, and a working Chrome/Playwright setup. Follow this project's `AGENTS.md` instructions for those tools. Motion and React Bits are installed per project, not MCP tools. Inspect the current repository first; if it is empty, initialize Git and choose a current, stable React + TypeScript framework capable of prerendering/SSR for the ten marketing URLs (Next.js App Router is a reasonable default). Explain a different choice in the README. Avoid a client-only SPA for important SEO content unless you also deliver crawlable pre-rendered HTML for every page. Use maintainable components, design tokens, and data-driven localized content. Avoid adding a CMS, database, authentication, dashboard backend, or AI API just to ship the marketing site.

Use a Persian font such as locally hosted Vazirmatn and an appropriate Latin font such as Inter with valid licenses and sensible fallbacks. Validate Persian shaping, punctuation, line-height, and numerals. Keep fonts and media efficient. Add real responsive image variants or vector assets where appropriate, descriptive alt text, and sensible loading priorities.

SEO foundation: each localized URL must render meaningful HTML with its own title, meta description, canonical on the **actual configured public origin**, reciprocal `hreflang` alternatives, Open Graph/Twitter metadata, a sensible social image derived from approved assets, one H1, semantic heading order, working internal links, `robots.txt`, XML sitemap, and structured data only for facts actually confirmed. Set up redirects/route handling and explain hosting requirements. Never put the private preview origin or localhost into production canonicals. Keep nonpublic previews out of indexing. Do not promise rankings or indexing from metadata alone. The owner will configure the final public domain and Search Console after deployment.

Contact: obtain the actual email address/endpoint from existing project config or a confirmed owner-provided value. The content file mentions `hello@viradataco.com` conditionally; its real delivery is not verified. Make contact settings explicit and safe. If no working submission backend is present, provide the accessible form UI with validation and a clearly labeled email-client preparation path *only if* a verified email is configured; otherwise use an honest unavailable state. No fake success, client-side secrets, invented phone number, or accidental storage of inquiry data. When a real endpoint is supplied later, validation and error handling should be easy to connect.

Separate demo availability from marketing copy. Use a typed status `planned | preview | live` with configured URLs. A valid preview should not be described as an AI-connected, PostgreSQL-connected, customer-data, or production system without evidence. Do not implement the full dashboard or assistant in this task; provide a clean integration point for them. If the existing private dashboard preview is linked, label its current local interpreter and synthetic data honestly, and verify access is appropriate for public visitors before publishing a link.

## Workflow and acceptance

1. Inspect files, assets, `AGENTS.md`, installed skills, Git state, and hosting clues. Do not overwrite existing work. Report any material conflict with the brief while continuing independent work.
2. Derive a concise visual direction and site architecture; implement all ten localized pages, shared shell, responsive motion, metadata, contact states, and demo integration config. Use the supplied copy.
3. Run install, typecheck, lint if configured, build, and relevant focused checks. Fix actual failures. Use Playwright/Chrome to inspect at least Home, Solutions, Demos, About, Contact in both languages and desktop/mobile widths (e.g., 1440, 768, 390, 360), including short heights. Check long Persian text, wrapping, touch targets, navigation, keyboard menu, direct URL loading, language switch, motion pause and reduced-motion setting, contact states, and links. Inspect console/network errors and take representative screenshots locally.
4. Check the output HTML of every localized route for crawlable primary copy, distinct metadata, canonical/hreflang consistency, sitemap URLs, and no preview/localhost origin in production mode. Verify that labels never call an unfinished demo live.
5. Iterate on visual quality after looking at actual rendered pages. Fix broken alignment, clipping, awkward spacing, weak visual hierarchy, and repetitive generic patterns. Ensure motion remains rich and intentional on both desktop and mobile.
6. Write a concise README: setup, commands, structure, how to replace logo, where to edit bilingual text, demo status/links, confirmed contact config, how to build/deploy, and the exact remaining items needing owner input. Include `.env.example` only for actual config. Commit completed work in sensible commits if this is a new Git repo; do not fabricate a multiweek history.

Finish with: what is built, screenshots/preview path if available, commands and checks that passed, what was actually tested in a browser, and a short list of genuine publication blockers (such as missing final logo, domain, verified email, hosting credentials, or live demo URL). Do not stop after planning. Do not deploy to the public domain without explicit authorization and access.

---
