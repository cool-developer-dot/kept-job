# Kept Job — marketing site

One-page site for Kept Job: after-hours & overflow call answering for field-service teams.

Next.js 16 · React 19 · Tailwind v4. No animation library: motion is CSS keyframes plus a few small hooks.

```bash
npm install
npm run dev
```

- Copy lives in each section component under `src/components/`.
- Call-to-action links (demo line, booking, contact, legal) are placeholders in `src/lib/site.ts`.
- Colours and every animation are in `src/app/globals.css`; all motion is skipped for `prefers-reduced-motion`.
