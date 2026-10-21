# Liara source release

Current source: `E:\Arash\ViraData\website`. Deployment is not performed by this repository workflow. Use the existing Liara **NextJS** application with Node 24, `npm run build`, and `npm run start`. The current `next.config.js` keeps a temporary 307 redirect from `/` to `/fa`.

## Current website

- Persian RTL and English LTR pages: home, solutions, demos, about, and contact.
- The solutions page has six segments: finance, intelligent operations, manufacturing and industry, commerce, sales, and healthcare. Each pairs real problems with possible approaches.
- About copy describes the ViraData team without naming individuals or a legal collaboration model.
- The contact form has name, email, organization, phone, message, honeypot, and server rate limiting. It has no topic field. Email subject is general, recipient is `vp.sales@viradataco.com`, and Reply-To uses the visitor address.
- The same address is a mailto link on the contact page and footer. The footer up button scrolls within the current page and respects reduced motion.
- Demo availability remains `planned`; the interface says the demos are in preparation. No production data or live AI capability is claimed.
- The existing color palette, logo, font, and registered IRANYekanX license `21LDVTC6` are retained.

## Environment and release boundaries

Set `NEXT_PUBLIC_SITE_ORIGIN=https://viradataco.com` in the existing Liara application before its production build. Keep all SMTP values in Liara environment settings. Do not include `.env` files, passwords, or SMTP values in Git or the source ZIP. `SMTP_FROM` may differ from the contact recipient; keep the provider-authorized sender already configured in Liara. Local unit tests use transport doubles and do not prove mailbox delivery.

Palette studies and their comparison page are in `palette-preview/`. Run the local workflow described in [palette-preview/README.md](palette-preview/README.md). The default website does not import those styles or serve that page. The Liara ZIP excludes the entire preview directory and screenshots.

## Build and archive

After reviewing and committing source changes:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/build-liara-package.ps1
```

The packaging script uses a positive allowlist from `HEAD`: `app/`, `components/`, `lib/`, `public/`, and the five root build files. It adds `_release-manifest.json` inside the ZIP. It then verifies every ZIP entry against its SHA-256, writes an external manifest and `.sha256` sidecar, and verifies the archive hash. All artifacts go to ignored `backups/`. Rebuild the archive after any new commit.

Before deployment, verify the chosen Liara application, public origin, domain and TLS settings, Node version, runtime environment, and actual form receipt. Browser and local build checks cannot verify the live Liara account or mailbox. Do not deploy until the final ZIP and verification report have been reviewed.
