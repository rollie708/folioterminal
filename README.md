# Folio

An original, independent coming-soon website for Folio, an all-in-one crypto trading terminal being developed for Robinhood Chain.

**One Terminal. Every Opportunity.**

## Run locally

Use Node.js 22 or 24 LTS and npm 10 or later. Node.js 24 is recommended.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Production

```sh
npm ci
npm run build
npm run start
```

No environment variables, API keys, database, wallet connection or external backend are required. `.env.example` documents this; copying it is unnecessary.

## Deploy to a NEW Vercel project

1. Import this repository into a **new** Vercel project.
2. Set the root directory to the repository root (`./`).
3. Select the **Next.js** framework preset and **Node.js 24.x**.
4. Set the install command to `npm ci`.
5. Use build command `npm run build`.
6. Keep the Next.js preset's default output configuration (`.next`). Do not set an `out` or `dist` directory.
7. Leave environment variables empty and deploy.
8. Verify the homepage, demo interactions, mobile menu, social destinations, `/social-card.png`, and an unknown URL's 404 response on the new deployment URL.

No Vercel project ID, organization ID, existing domain, or deployment credentials are embedded. Framework autodetection is intentional: no conflicting `vercel.json` overrides are needed.

## Other Node-compatible hosts

- Install: `npm ci`
- Build: `npm run build`
- Start: `npm run start -- --hostname 0.0.0.0 --port 3000`
- Replace `3000` with the port assigned by your hosting platform.
- Output: `.next`, served by Next.js; keep `public`, package files and installed dependencies available to the process.
- Use Node.js 22 or 24 LTS. Terminate HTTPS at your hosting platform/reverse proxy.
- Preserve the public `Host` header and forward `X-Forwarded-Proto: https` behind a reverse proxy. Social-image metadata resolves against the request hostname; no hardcoded production domain or required environment variable exists.
- The app is server-rendered using standard Next.js hosting. Do not upload `.next` to a plain static-file host or GitHub Pages.

## Verification

```sh
npx playwright install chromium
npm run build
npm run check
```

`check` runs TypeScript and 10 production-browser tests (desktop and mobile). Playwright starts and stops its own production server on port 3107; that port must be free. Browser installation is only needed for tests, not for production.

Tests cover:

- All sections, metadata, fonts, assets, HTTP status and security headers.
- Browser exceptions, console errors, failed requests and absence of third-party runtime requests.
- Search, empty results, token selection, watchlist controls, timeframes, volume and portfolio view.
- Internal navigation, mobile navigation, and actual popup clicks to the supplied social URLs.
- WCAG 2 A/AA and WCAG 2.1 AA automated axe checks.
- Horizontal overflow at 320, 375, 390, 680, 768, 1024, 1440 and 1920 pixels.
- Reduced-motion support and custom 404 navigation.

Social popup tests intercept third-party responses while verifying the exact destination. They do not claim to validate availability of Telegram or X, which may have network/login restrictions.

See [VERIFICATION.md](VERIFICATION.md) for recorded results and resolved issues.

## Project map

```text
src/app/                  Page, metadata, styles and error/404 handling
src/components/           Original brand, navigation, charts and terminal
src/lib/demo.ts           Fixed fictional token data and social URLs
public/                   Local icons, social card and robots.txt
scripts/generate-assets.mjs  Reproducible local social/icon asset generator
tests/site.spec.ts        Production browser tests
playwright.config.ts     Desktop/mobile test configuration
next.config.ts           Standard Next.js config and security headers
package-lock.json        Fresh, pinned dependency lockfile
.github/workflows/ci.yml  Clean Linux installation, build and browser tests
```

## Stack

- Next.js 16.4.6 / React and React DOM 19.3.1.
- TypeScript 5.9.3 with strict checking.
- Original responsive CSS, CSS animations and reduced-motion handling.
- Lucide React 1.73.0 icons.
- Manrope variable font, served locally from `@fontsource-variable/manrope` 5.3.0.
- Playwright 1.65.1 and axe-core Playwright 4.11.1 for verification.

No UI template, external component project, chart service, CDN font, remote image, analytics, or trading API is used. Fonts are bundled by the build. All charts are original local SVGs.

## Demo behavior

All tokens, balances, transactions, chart movements, signals and risk indicators are fictional and labelled as demo data. Buttons only manipulate the local demonstration; there is no real trade, wallet connection or live market feed. Watchlist changes last for the current page session. Product capabilities and roadmap stages are explicitly planned/in development.

Social links:
- https://t.me/folioterminal
- https://x.com/folioterminal?s=11

The project can be moved independently: copy this directory or clone the repository, then run `npm ci`. Do not copy `node_modules` or `.next` between machines; generate them on the target machine using the lockfile.
