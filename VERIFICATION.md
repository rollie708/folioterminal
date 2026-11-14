# Production verification

## Completed locally

- Project created from scratch in `folio-independent`; no previous Folio project was read, imported, cloned or modified.
- Dependencies installed locally with a fresh `package-lock.json`.
- `npm install`: successful; dependency audit reported **0 vulnerabilities**.
- `npm run build`: successful with no build warnings after fixes.
- `npm run typecheck`: successful.
- `npm run check`: **10 tests passed**, across desktop and mobile Chromium.
- Production startup (`next start`), HTTP 200 homepage, all six core feature cards, four planned roadmap stages, all navigation targets and real 404 behavior verified.
- No console errors, uncaught browser exceptions, missing assets, failed homepage requests or third-party runtime requests observed by the automated browser checks.
- Automated axe WCAG checks passed on desktop and mobile.
- Responsive overflow tests passed from 320px through 1920px.
- Local font, social image, icon and robots file verified.
- Desktop and mobile full-page screenshots generated in `test-results` for local review (not committed build artifacts).

## Issues found and resolved

1. **Initial dependency install timeout:** repeated the installation with enough time for package download; install completed and audit passed.
2. **Next.js social metadata fallback:** initial build warned that social image URLs would fall back to localhost. Metadata now derives its base URL from incoming host/protocol, so fresh deployments require no preconfigured domain or environment variable. Rebuilt without warnings.
3. **Portfolio search consistency:** replaced positional holding values with symbol-keyed holdings and restricted the portfolio list to its three sample holdings.
4. **Smallest-screen overflow:** browser testing found a 5px overflow at 320px caused by the last roadmap connector's negative margin. Corrected the final connector rule and verified all tested widths.
5. **Test harness mobile link:** the social test initially attempted to click the hidden desktop CTA on mobile. Updated it to select a visible link; verified both destinations through popup clicks.
6. **Test screenshot timing:** the mobile full-page screenshot at the device's high pixel density exceeded the test runner's initial time limit. Set screenshot pixel density to one while preserving mobile viewport/touch emulation, and adjusted the suite's timeout. The complete suite passed afterward.

## Scope of verification

The social tests confirm the exact supplied URL, `_blank` behavior and safe link attributes using intercepted destination responses. They do not certify the availability of third-party social platforms. Automated accessibility checks supplement, rather than replace, human usability review.

There is no claim of a hosting deployment in this report. GitHub source publication is separate from hosting. Follow the README to deploy a new Next.js hosting project and verify its assigned URL.
