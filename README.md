# Leibinn Consulting

Landing page and contact route for Leibinn Consulting: benefit systems for German
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
node scripts/test-form.mjs      # contact form, end to end; the Supabase call is intercepted
node scripts/test-nav.mjs       # every CTA, routing, layout overflow, a11y basics
node scripts/copyguard.mjs out.txt   # extracts all rendered copy, for diffing
node scripts/measure-weight.mjs http://localhost:4173 label
node scripts/shoot.mjs out/ http://localhost:4173 tag --reduced   # full-page screenshots
node scripts/shoot-section.mjs out/ 1440 "#rechner" "#faq=faq"    # one section at a time
```

`npm run images -- cedrik-cutout` regenerates only the named image instead of
re-encoding every photo.

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
   are never lost, but the job title is silently dropped until it is applied.
3. **Set the environment variables on the host** (`VITE_SUPABASE_URL`,
   `VITE_SUPABASE_ANON_KEY`). `.env` is no longer committed.
4. **Fill in `/impressum` and `/datenschutz`.** Both pages are scaffolding: every
   `[PLATZHALTER]` needs real company data, and the text needs a lawyer's review.
   Both are legally required for a German commercial site.
5. **Check the SPA rewrite.** `public/_redirects` (Netlify) and `vercel.json` are
   both included. Without one of them, loading `/kontakt` directly returns a 404.
6. Consider **self-hosting the fonts**. They currently come from Google Fonts,
   which is why the privacy policy has a section about it.
7. **Supply two or three real testimonials, or switch the section off.** The
   Stimmen carousel is the last section still built from `Slot` placeholders,
   and it is live on the page. Quotes need the client's permission, so none were
   written. Until real ones exist, remove `<StimmenSection />` from
   `src/pages/HomePage.tsx`: an empty proof block costs more trust than no
   proof block.
8. **Have the tax statements checked.** The Rechner, the Venn's building blocks,
   the Branchen panels and the FAQ state statutory figures as fact (50 € Sachbezug,
   600 € Gesundheitsförderung, 156 € Erholungsbeihilfe, 110 € per Betriebsveranstaltung,
   1.080 € Rabattfreibetrag, the § references). They are correct for 2026 as
   researched, but they are tax statements made to prospects, so a Steuerberater
   should read them once, and they should be re-checked every January.
9. **Confirm three answers about the firm itself.** The FAQ says the
   Erstgespräch is followed by an offer based on size and scope, that Analyse,
   Konzept and Kommunikation are handled by Leibinn, and that implementation can
   start with single building blocks at short notice. These follow from the
   site's existing claims but are worth the client's yes.
10. **Decide on the logo's tagline.** The supplied lockup reads "Leibinn
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
| `ink-600` | `#2A2D7C` | `true-cobalt` / `primary`; identity and all CTAs |
| `ink-700` | `#202266` | Wirkungsbereich segment, final-CTA gradient |
| `ink-800` | `#15174F` | `deep-navy` |
| `ink-900` | `#0B0C39` | `deep-navy-dark` |
| `ink-950` | `#000022` | `prussian-blue`, the handoff's `navy`; footer |
| `ice-300` | `#A1CEE5` | `icy-blue` / `secondary` |
| `ice-400` | `#75AED4` | final-CTA check icons |

Surfaces are `canvas` / `panel` / `raised`; rules are `line` (plus `line-onInk`
and `line-onInkStrong` for dark panels); text is `content-strong` / `content` /
`content-muted` / `content-faint`. Those replace the `text-black/70`-style alpha
values. `success` and `danger` exist for form state.

**Contrast rule:** `ice-300` is 1.7:1 on white, so never use it for text on a light
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

`src/components/ui/`: `Section` (background rhythm and vertical spacing),
`Container`, `SectionHead`, `Eyebrow`, `Card`, `Button`, `Field`, `Image`,
`Reveal`, `SplitWords`, `Accordion`, `SegmentedToggle`, `RangeSlider`, `Logo`,
and `Slot` (the dashed marker for copy the client still has to write). Compose
pages from these instead of repeating utility strings.

### Motion

Scroll motion is CSS, driven by one IntersectionObserver per block
(`useReveal`), so it costs nothing on first paint. The observer only adds
`.is-revealed`; everything inside animates off that flag through the `a-*`
classes in `src/index.css`, each delayed by its own `--d`:

| Class | Motion |
| --- | --- |
| `a-rise` / `reveal` | fades up 28px |
| `a-words` + `<SplitWords>` | headline words rise out of their own clipped line boxes |
| `a-line` / `a-rail` | rules draw in from the left / from the top |
| `a-mask` (via `<Reveal variant="mask">`) | photo uncovers upward and settles from a slight zoom |
| `a-bloom` | SVG shapes grow from their own centre |
| `a-pop` | small round controls arrive with a quarter turn |
| `a-settle` | swapped content (tabs, toggles) settles in on change |

Every one of them is switched off under `prefers-reduced-motion`. Two pitfalls
are documented in the CSS: a mask must never clip the observed element itself
(IntersectionObserver counts the target's own `clip-path`, so it would never
fire), and an `a-*` class must not share an element with a positioning
transform (the revealed state's `transform: none` would cancel it).

Scroll-linked motion (the Ansatz photo's travel, the Ablauf timeline's fill)
writes transforms straight to the element each frame instead of going through
React state.

---

## Images

`assets-source/` holds the photo masters. They are **not** bundled: nothing in
`src/` imports them. `npm run images` reads them and writes responsive
AVIF/WebP derivatives to `src/assets/images/`, which `src/lib/images.ts` picks up
automatically and `src/components/ui/Image.tsx` serves via `<picture>`.

To add a photo: drop it in `assets-source/`, add an entry to
`scripts/optimize-images.mjs`, run `npm run images`, then export it from
`src/lib/images.ts`.

Do not point an `<img>` at a master directly. That is what made the original
homepage 25 MB.

---

## Brand assets

`src/assets/brand/` holds the logo exactly as the brand package supplied it: a
black and a white horizontal lockup, the full-colour stacked version, and the
square mark. Those files are the source of truth, and nothing else should be
treated as the logo.

They are raster, and a header logo wants to be vector, so `npm run logo` traces
them once with `potrace` (`apt-get install potrace`) and writes
`src/components/ui/logo-paths.ts` plus a JSON copy for the build scripts. The
trace comes apart into three groups (the wing mark, the name, the tagline) so
`Logo` can paint the mark in the brand gradient while the type follows whatever
surface it sits on, and can drop the tagline at header sizes where it would be a
smudge. The gradient (`#A1CEE5` → `#2A2D7C`) is sampled from the artwork; it is
`ice-300` → `ink-600` to within a digit, because the palette came from the logo.

The brand package's "Logo frames" (the mark traced as hairlines at various
scales) were used as tilted background ornaments for one pass and then retired
at the client's request. The dark sections carry a soft two-point glow
(`.ink-glow`) instead; the blueprint grid they had before is gone too.

Cedrik's cut-out in the closing CTA (`assets-source/cedrik-cutout.png`) was made
from photo 7 with `rembg` and the `birefnet-portrait` model, cropped head to
chest. To redo it: `pip install "rembg[cpu]"`, run `remove()` with
`new_session("birefnet-portrait")`, crop, and `npm run images -- cedrik-cutout`.

`npm run icons` builds `favicon.svg`, `apple-touch-icon.png` and `icon-512.png`
from the same mark. `npm run og` builds the share card, typeset in Instrument
Sans with the real lockup.

---

## Notes on the rebuild

This site was originally generated in Bolt. The first rebuild kept **all copy
byte for byte** and changed everything else. The substantive fixes, for context:

- `/kontakt` discarded every enquiry: the submit handler made no network call
  while telling the visitor they would hear back within 24 hours. The working
  Supabase code existed in an unrendered `KontaktSection.tsx`.
- Three CTAs pointed at a `#kontakt` anchor that did not exist on the homepage.
- `Impressum` and `Datenschutz` were `<button>` elements with no handler.
- Images were unprocessed camera originals; the homepage transferred 25.6 MB.
- 87 hardcoded hex values across three competing palettes, including a
  `#016FB9` azure on every CTA that was not part of the brand.
- `og:image` pointed at a Bolt placeholder, and `<html lang="en">` on a German site.

`scripts/copyguard.mjs` kept that promise honest: it walks both routes at two
viewports, opens every disclosure and tab, and dumps every rendered string.

**The copy was then rewritten on purpose**, at the client's request, after a
review of how the leading German benefit providers (Belonio, Probonio, hrmony,
Salfy, Pluxee) sell. The rules it follows:

- every claim and fact from the original survives; only the wording changed
- no em dashes, no reflexive three-item lists, no "nicht nur … sondern auch",
  no hollow intensifiers (spürbar, messbar, nachhaltig, maßgeschneidert)
- the only new facts about the firm are the ones the client supplied
  ("55+ Mandanten") or the site already stated (24-hour reply, 5–200
  employees, personal support by Cedrik Leibinn); everything else new is
  statutory fact
- the strongest argument in the market leads where it can: a tax-free euro
  arrives whole, a gross euro does not

Run the copy guard before and after any future edit to see exactly which
strings changed.
