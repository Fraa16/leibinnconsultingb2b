# Leibinn Consulting

Landing page and contact route for Leibinn Consulting — benefit systems for German
SMEs with 5–200 employees.

Vite · React 18 · TypeScript · Tailwind · framer-motion · Supabase

---

## Running it

```bash
npm install
cp .env.example .env     # fill in the Supabase project values
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output |
| `npm run typecheck` | `tsc --noEmit` (strict, no unused locals/params) |
| `npm run lint` | ESLint |
| `npm run images` | Regenerate responsive image derivatives from `assets-source/` |
| `npm run og` | Regenerate `public/og-image.jpg` and the touch icon |

Verification scripts (need `npm run preview` running on :4173):

```bash
node scripts/test-form.mjs      # contact form, end to end — Supabase call is intercepted
node scripts/test-nav.mjs       # routing, layout overflow, a11y basics
node scripts/copyguard.mjs out.txt   # extracts all rendered copy, for diffing
node scripts/measure-weight.mjs http://localhost:4173 label
```

---

## Before this goes live

1. **Confirm the production domain.** `https://leibinn-consulting.de` is assumed in
   `index.html` (canonical, OG, JSON-LD), `public/sitemap.xml`, `public/robots.txt`
   and `SITE_ORIGIN` in `src/hooks/useDocumentMeta.ts`. Change it in those four
   places if it is wrong.
2. **Apply the Supabase migration**
   `supabase/migrations/20260916210000_add_position_to_contact_submissions.sql`.
   It adds the `position` column the form has always collected. The form falls
   back to inserting without that field if the migration has not run, so leads
   are never lost — but the job title will be silently dropped until it is applied.
3. **Set the environment variables on the host** (`VITE_SUPABASE_URL`,
   `VITE_SUPABASE_ANON_KEY`). `.env` is no longer committed.
4. **Fill in `/impressum` and `/datenschutz`.** Both pages are scaffolding: every
   `[PLATZHALTER]` needs real company data, and the text needs a lawyer's review.
   Both are legally required for a German commercial site.
5. **Check the SPA rewrite.** `public/_redirects` (Netlify) and `vercel.json` are
   both included. Without one of them, loading `/kontakt` directly returns a 404.
6. Consider **self-hosting the fonts**. They currently come from Google Fonts,
   which is why the privacy policy has a section about it.

---

## Design system

Defined in `tailwind.config.js` and `src/index.css`. Write against these tokens
rather than hex values.

### Colour

One cold navy spine with a single ice accent. Every original brand hex survives
as a named step.

| Token | Hex | Was |
| --- | --- | --- |
| `ink-600` | `#2A2D7C` | `true-cobalt` / `primary` — identity and all CTAs |
| `ink-700` | `#202266` | Venn segment, final-CTA gradient |
| `ink-800` | `#15174F` | `deep-navy` |
| `ink-900` | `#0B0C39` | `deep-navy-dark` |
| `ink-950` | `#000022` | `prussian-blue` — footer |
| `ice-300` | `#A1CEE5` | `icy-blue` / `secondary` |
| `ice-400` | `#75AED4` | final-CTA check icons |

`surface` (base / subtle / muted) and `content` (strong / DEFAULT / muted /
subtle) replace the `text-black/70`-style alpha values. `success` and `danger`
exist for form state.

**Contrast rule:** `ice-300` is 1.7:1 on white — never use it for text on a light
background. On `ink-800` it is 9.9:1, which is where it belongs. `ink-600` on
white is 11.9:1 and is safe anywhere.

### Type

DM Sans in two weights only — light 300 for body, semibold 600 for headings. That
contrast is the brand voice; adding intermediate weights dilutes it.

Sizes are fluid `clamp()` steps: `display`, `h1`–`h4`, `lead`, `body`, `small`,
`eyebrow`. `h1`–`h6` carry their size from the base layer, so markup only needs a
size class when it deliberately deviates.

Alex Brush is registered as `font-signature` and is used exactly once, for the
sign-off in the Über-uns section.

### Primitives

`src/components/ui/` — `Section` (background rhythm and vertical spacing),
`Container`, `Card`, `Button`, `Eyebrow`, `Field`, `Image`, `Reveal`.
Compose pages from these instead of repeating utility strings.

Motion lives in `src/lib/motion.ts` as one shared spec, and every animated
component checks `useReducedMotion()`.

---

## Images

`assets-source/` holds the photo masters. They are **not** bundled — nothing in
`src/` imports them. `npm run images` reads them and writes responsive
AVIF/WebP derivatives to `src/assets/images/`, which `src/lib/images.ts` picks up
automatically and `src/components/ui/Image.tsx` serves via `<picture>`.

To add a photo: drop it in `assets-source/`, add an entry to
`scripts/optimize-images.mjs`, run `npm run images`, then export it from
`src/lib/images.ts`.

Do not point an `<img>` at a master directly — that is what made the original
homepage 25 MB.

---

## Notes on the rebuild

This site was originally generated in Bolt. The rebuild kept **all copy byte for
byte** and changed everything else. The substantive fixes, for context:

- `/kontakt` discarded every enquiry — the submit handler made no network call
  while telling the visitor they would hear back within 24 hours. The working
  Supabase code existed in an unrendered `KontaktSection.tsx`.
- Three CTAs pointed at a `#kontakt` anchor that did not exist on the homepage.
- `Impressum` and `Datenschutz` were `<button>` elements with no handler.
- Images were unprocessed camera originals; the homepage transferred 25.6 MB.
- 87 hardcoded hex values across three competing palettes, including a
  `#016FB9` azure on every CTA that was not part of the brand.
- `og:image` pointed at a Bolt placeholder, and `<html lang="en">` on a German site.

One deliberate wording change: the mobile menu button's `aria-label` was
`"Toggle menu"` (English) and is now `"Menü"`. Revert in
`src/components/Navigation.tsx` if the original is preferred.
