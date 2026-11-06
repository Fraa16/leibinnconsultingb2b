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
| `npm run logo` | Re-trace the brand lockup to vector paths (needs `potrace`) |
| `npm run icons` | Regenerate `public/favicon.svg` and the touch icons |
| `npm run og` | Regenerate `public/og-image.jpg` |

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
7. **Write the copy still marked as slots.** Anything wrapped in
   `src/components/ui/Slot.tsx` renders as a visibly dashed placeholder — the
   Vergleich table, the Rechner labels, the testimonials, the FAQ, and the hero's
   floating trust panel. The structure and behaviour are built; the wording is
   the client's. Grep for `<Slot` to find every one. Nothing invented was put in
   the client's mouth, which is why they are empty rather than plausible.
8. **Decide on the logo's tagline.** The supplied lockup reads "Leibinn
   Consulting / Investment Consulting", but this site sells benefit systems to
   employers. The tagline is drawn in the footer and the share card and left off
   in the header; if it is wrong for this audience, pass `tagline={false}` to the
   footer `Logo` and drop the `lockup.tagline` group from
   `scripts/generate-og.mjs`.

---

## Design system

Defined in `tailwind.config.js` and `src/index.css`. Write against these tokens
rather than hex values.

### Colour

One cold navy spine with a single ice accent. Every original brand hex survives
as a named step, and the old names still resolve as aliases.

| Token | Hex | Was |
| --- | --- | --- |
| `ink-600` | `#2A2D7C` | `true-cobalt` / `primary` — identity and all CTAs |
| `ink-700` | `#202266` | Wirkungsbereich segment, final-CTA gradient |
| `ink-800` | `#15174F` | `deep-navy` |
| `ink-900` | `#0B0C39` | `deep-navy-dark` |
| `ink-950` | `#000022` | `prussian-blue` — the handoff's `navy`; footer |
| `ice-300` | `#A1CEE5` | `icy-blue` / `secondary` |
| `ice-400` | `#75AED4` | final-CTA check icons |

Surfaces are `canvas` / `panel` / `raised`; rules are `line` (plus `line-onInk`
and `line-onInkStrong` for dark panels); text is `content-strong` / `content` /
`content-muted` / `content-faint`. Those replace the `text-black/70`-style alpha
values. `success` and `danger` exist for form state.

**Contrast rule:** `ice-300` is 1.7:1 on white — never use it for text on a light
background. On `ink-800` it is 9.9:1, which is where it belongs. `ink-600` on
white is 11.9:1 and is safe anywhere.

### Type

Instrument Sans, the face the brand's own Benefits handoff uses. Headings sit at
weight 500 and very tight tracking (−0.045em); body text is 400. The contrast
comes from size, not from stacking weights.

Sizes are fluid `clamp()` steps interpolated 375px → 1440px: `h1`–`h4`, `giant`,
`total`, `stat`, `lead`, `body`, `small`, and the tracked caps `label` / `meta`.
`h1`–`h6` carry their size from the base layer, so markup only needs a size class
when it deliberately deviates. (Tailwind's Preflight resets headings to
`font-size: inherit`; `src/index.css` closes that gap.)

Alex Brush is registered as `font-signature` and is used exactly once, for the
sign-off in the Über-uns section.

### Primitives

`src/components/ui/` — `Section` (background rhythm and vertical spacing),
`Container`, `SectionHead`, `Eyebrow`, `Card`, `Button`, `Field`, `Image`,
`Reveal`, `Accordion`, `SegmentedToggle`, `RangeSlider`, `Logo`, `Ornament`, and
`Slot` (the dashed marker for copy the client still has to write). Compose pages
from these instead of repeating utility strings.

Motion lives in `src/lib/motion.ts` as one shared spec, and every animated
component checks `useReducedMotion()`. Scroll reveals are CSS-driven through
`useReveal` so they cost nothing on first paint.

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

## Brand assets

`src/assets/brand/` holds the logo exactly as the brand package supplied it: a
black and a white horizontal lockup, the full-colour stacked version, and the
square mark. Those files are the source of truth — nothing else should be
treated as the logo.

They are raster, and a header logo wants to be vector, so `npm run logo` traces
them once with `potrace` (`apt-get install potrace`) and writes
`src/components/ui/logo-paths.ts` plus a JSON copy for the build scripts. The
trace comes apart into three groups — the wing mark, the name, the tagline — so
`Logo` can paint the mark in the brand gradient while the type follows whatever
surface it sits on, and can drop the tagline at header sizes where it would be a
smudge. The gradient (`#A1CEE5` → `#2A2D7C`) is sampled from the artwork; it is
`ice-300` → `ink-600` to within a digit, because the palette came from the logo.

`Ornament` redraws the same mark as a 1px contour. That is what the brand
package's "Logo frames" folder is — the mark traced at various scales, dropped
behind a dark panel at a few percent opacity — and redrawing it from the vector
costs no bytes, stays a true hairline at any scale, and takes the colour of the
surface.

`npm run icons` builds `favicon.svg`, `apple-touch-icon.png` and `icon-512.png`
from the same mark. `npm run og` builds the share card, typeset in Instrument
Sans with the real lockup.

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

`scripts/copyguard.mjs` is what keeps that promise honest: it walks both routes
at two viewports, opens every disclosure, and dumps every rendered string.
Diffing its output against the same run on the original build is the check that
nothing was lost. Run it against the old and the new build and `comm -23` the
two files.

Two deliberate wording changes, both in text no visitor reads:

- The mobile menu button's `aria-label` was `"Toggle menu"` (English) and is now
  `"Menü"`. Revert in `src/components/Navigation.tsx` if the original is wanted.
- The header logo is now the brand's own artwork rather than the name set in the
  UI face, so "Leibinn Consulting" reaches assistive tech as the SVG's
  `aria-label` instead of as a text node.
