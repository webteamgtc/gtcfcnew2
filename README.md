# GTCFC.com — 3 design concepts

**Stack:** Next.js 14 (App Router, JavaScript — no TypeScript) · Tailwind CSS · Three.js (@react-three/fiber + drei) · Framer Motion

One project, three complete designs. Each concept has the same pages and content, so the GM can compare and pick one.

| Concept | Look | 3D element | Motion |
|---|---|---|---|
| **1. Aurum** | Luxury navy & gold, Poppins headings, Inter body (matches the Coming Soon banner colours) | Gold particle globe with animated trade arcs from Dubai to London, New York, Tokyo, Singapore, Hong Kong, Zurich | Word-by-word headline reveal, gold sheen text, mouse-follow spotlight cards, sliding sub-nav indicator |
| **2. Horizon** | Glassmorphism, floating pill navbar, aurora background | Metallic gold torus knot + floating gold shards (reacts to the mouse) | Spring nav highlight, instrument marquee, animated "Path to launch" roadmap, licence progress bar |
| **3. Monolith** | Pure black bento layout — closest to the GM's "Website Navigation" reference | Interactive wave field of points (shader, ripples under the cursor) | Full-screen menu wipe, scroll-linked text reveal, parallax hero, giant footer wordmark |

## Pages (in every concept)

`/coming-soon` · `/` Home · `/about` (Company · Group · Contact) · `/regulation` (Licence · Authorisation · Disclosures) · `/markets` (Products · Platforms · Conditions) · `/support` (FAQ · Contact · Complaints) · `/open-account` · `/login`

URLs are prefixed with the concept: `/aurum/regulation`, `/horizon/regulation`, `/monolith/regulation`.

## Settings (`.env.local` locally, Environment Variables on Vercel)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_DESIGN` | `aurum` / `horizon` / `monolith` — the concept the public sees |
| `NEXT_PUBLIC_SITE_MODE` | `coming-soon` = public sees only the Coming Soon page. `full` = whole site public |
| `PREVIEW_KEY` | Secret. Open `https://gtcfc.com/?preview=YOUR_KEY` to unlock the full site **and** the `/concepts` chooser (all 3 designs). `/?preview=off` to exit |
| `NEXT_PUBLIC_LICENCE_STATUS` | `pending` (account opening/login disabled, "application in progress" notices) or `licensed` |
| `NEXT_PUBLIC_LICENCE_NUMBER`, `NEXT_PUBLIC_LICENCE_DATE` | Shown once licensed |
| `NEXT_PUBLIC_OPEN_ACCOUNT_URL`, `NEXT_PUBLIC_CLIENT_LOGIN_URL` | Client portal links, used once licensed |

Redeploy after changing any `NEXT_PUBLIC_*` value.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
# open http://localhost:3000/?preview=change-me  → concept chooser
```

## Where things are

```
src/lib/site.js          company details, licence status, risk warning, navigation
src/lib/content.js       all page text (shared by the 3 concepts)
src/concepts/aurum/      Scene.js (3D) · Shell.js (header/footer) · Pages.js (home, pages, coming soon)
src/concepts/horizon/    same structure
src/concepts/monolith/   same structure
src/components/shared/   animations (Reveal, SplitWords), content blocks, account gate
src/middleware.js        Coming Soon lock + preview key
```

## Before going live

- Fill every `[placeholder]` (shown in orange italics): office address, DED trade licence no., phone, management, platform name, leverage, minimum deposit, spreads, complaint timelines.
- Horizon's "Path to launch" marks *Company established* as done and *CMA application* as in progress — adjust in `src/concepts/horizon/Pages.js` if needed.
- Have Compliance / legal counsel approve all regulatory wording, the risk warning and the policy documents; prepare an Arabic version if the CMA requires it.
- Once a concept is chosen, the other two folders can be deleted.

3D scenes pause when scrolled off-screen, and fall back to a static gradient if a device has no WebGL. Animations respect the visitor's "reduce motion" setting.

## Fonts

Headings use **Poppins**, body text uses **Inter** (Google Fonts, loaded in `src/app/layout.js`; tokens in `src/app/globals.css`).
