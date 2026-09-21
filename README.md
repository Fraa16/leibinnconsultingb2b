# Leibinn Consulting

Marketing site for Leibinn Consulting — benefit systems for German SMEs.
React + TypeScript + Vite + Tailwind, contact form backed by Supabase.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run images     # regenerate responsive images (needs: npm i -D sharp)
```

## Environment

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Both are read in `src/lib/supabase.ts`. If either is missing the site still
renders; only the contact form falls back to its e-mail route.

---

## Design system

The palette, type scale and spacing rhythm live in **`src/index.css`** as CSS
custom properties, and are mirrored into Tailwind in `tailwind.config.js`.
Components consume tokens — they should not introduce raw hex values.

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--lc-navy` | `#2A2D7C` | primary actions, icons |
| `--lc-navy-deep` | `#15174F` | headings, dark section base |
| `--lc-navy-black` | `#0B0C39` | deepest dark sections |
| `--lc-ice` | `#A1CEE5` | accent on dark, eyebrow text |
| `--lc-canvas` | `#F9F9F9` | page canvas behind the blocks |
| `--lc-surface` | `#FFFFFF` | light section blocks |

Text tokens (`--lc-ink`, `--lc-ink-muted`, `--lc-ink-subtle`) are tuned to
clear WCAG AA against the canvas. `--lc-ink-display` is lighter and is **only**
valid on display-size headings, where the AA threshold is 3:1 rather than 4.5:1
— that is what `.t-muted` uses for the two-tone headline effect.

### Type

Fluid `clamp()` classes, so no per-breakpoint size overrides are needed:
`.t-display`, `.t-h2`, `.t-h3`, `.t-lead`, `.t-body`, `.t-small`.
Weight never exceeds 500 — the design reads through size and spacing, not bold.

Fonts (DM Sans, Alex Brush) are **self-hosted** from `src/fonts/`. Do not move
them back to the Google Fonts CDN: on a German site that re-introduces the
GDPR exposure from LG Munich I, 3 O 17493/20.

### Layout

Sections are rounded blocks floating on the canvas, inset by `--lc-gutter`.
Use the `Section` primitive (`src/components/ui/Section.tsx`) with
`tone="canvas" | "surface" | "dark"` — it owns the vertical rhythm and the
light/dark alternation. `.on-dark` flips pills, buttons and rules automatically.

Shared primitives live in `src/components/ui/`:
`Section`, `SectionHeading`, `Pill`, `CTAButton`, `Picture`, `Reveal`.
Form controls are in `src/components/form/Field.tsx` and wire label, hint and
error together by id — always use them rather than a bare `<input>`.

### Motion

`Reveal` is the only scroll-animation wrapper. It collapses to a no-op under
`prefers-reduced-motion`, which the global reset in `index.css` also honours.

## Images

The client's camera masters live in `src/images/originals/` (~25 MB). They are
**never imported**, so they never reach the bundle. What ships are the AVIF and
WebP derivatives declared in `src/lib/media.ts` and served through `Picture`
with a real `srcset`. After replacing a master, re-run `npm run images`.

The desktop hero is a special case. Its block runs about 2:1 while the
photograph is 1.4:1, so `object-cover` consumes the full image width and
`object-position`'s X axis has no effect there. `npm run images` therefore also
builds `cedrik-hero-wide-*`, a 2.5:1 plate with blurred headroom composited on
the left, which moves the subject from 46% to ~72% of the frame and clears him
of the headline. The headroom renders under the navy scrim and is never seen.

## Before going live

- [ ] Fill in the `[...]` placeholders in `src/pages/ImpressumPage.tsx` (§5 DDG
      requires name, legal form, address, e-mail, phone, and where applicable
      register and VAT ID).
- [ ] Have `src/pages/DatenschutzPage.tsx` reviewed, and fill in the Supabase
      processor details and server location.
- [ ] Add a 1200×630 share image at `/og-image.jpg` and uncomment the two
      `og:image` / `twitter:image` tags in `index.html`.
- [ ] Update the canonical and `og:url` in `index.html` if the domain differs.
- [ ] Confirm the fallback address in the contact form's error state
      (`src/pages/KontaktPage.tsx`) is a mailbox that is actually monitored.
- [ ] Configure the host to rewrite unknown paths to `index.html`, otherwise
      `/kontakt`, `/impressum` and `/datenschutz` 404 on a hard refresh.
