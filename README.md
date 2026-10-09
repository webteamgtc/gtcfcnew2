# GTCFC.com — static design drafts

Three self-contained HTML concepts for **GTC Financial Consultancy LLC**.

| File | Opens by default |
|------|------------------|
| [draft1.html](./draft1.html) | Full website home |
| [draft2.html](./draft2.html) | Full website home |
| [draft3.html](./draft3.html) | Full website home |

Coming Soon only: append `#coming-soon` (e.g. `draft1.html#coming-soon`).

## Review locally

Open [index.html](./index.html) or any `draftN.html` directly in a browser.

## Deploy (Vercel)

1. Project **Settings → General → Framework Preset**: **Other** (not Next.js).
2. **Build command** and **Install command**: leave empty. **Output directory**: `.`
3. **Redeploy** from the latest `main` (Deployments → … → Redeploy).

Root `/` serves `index.html`. Review drafts:

- `/draft1.html` — full site (Draft 1)
- `/draft2.html` — Draft 2
- `/draft3.html` — Draft 3

If you still see the old navy “COMING SOON” globe page, the deployment is the **previous Next.js app** — change framework settings and redeploy.
