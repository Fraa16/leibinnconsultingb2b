/** @type {import('tailwindcss').Config} */

/**
 * Leibinn Consulting design system.
 *
 * One palette: a cold navy spine (`ink`) with a single ice accent (`ice`).
 * Every brand hex from the original config survives as a named step, so the
 * identity is unchanged — the ramp just fills the gaps that forced 87
 * hardcoded hex values into the components.
 *
 *   ink-600  #2A2D7C  was `true-cobalt` / `primary`      — identity + CTAs
 *   ink-700  #202266  was the Venn / final-CTA gradient
 *   ink-800  #15174F  was `deep-navy` / `primary.dark`
 *   ink-900  #0B0C39  was `deep-navy.dark`
 *   ink-950  #000022  was `prussian-blue`
 *   ice-300  #A1CEE5  was `icy-blue` / `secondary`
 *   ice-400  #75AED4  was the final-CTA check icons
 *
 * Contrast, measured against #FFFFFF:
 *   ink-600  11.9:1  ✓ any text
 *   ice-300   1.7:1  ✗ never text on light — accents, borders and fills only
 *                      (on ink-800 it is 9.9:1, which is where it belongs)
 */

// 375px → 1440px fluid interpolation
const fluid = (minPx, maxPx) => {
  const minRem = minPx / 16;
  const maxRem = maxPx / 16;
  const slope = (maxRem - minRem) / (1440 / 16 - 375 / 16);
  const intercept = minRem - slope * (375 / 16);
  return `clamp(${minRem}rem, ${intercept.toFixed(4)}rem + ${(slope * 100).toFixed(3)}vw, ${maxRem}rem)`;
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F4F6FB',
          100: '#E6EAF5',
          200: '#C7D0E8',
          300: '#9AA8D2',
          400: '#6473AE',
          500: '#3D4590',
          600: '#2A2D7C',
          700: '#202266',
          800: '#15174F',
          900: '#0B0C39',
          950: '#000022',
        },
        ice: {
          50: '#F2F9FC',
          100: '#E3F1F8',
          200: '#C7E3F1',
          300: '#A1CEE5',
          400: '#75AED4',
          500: '#4F92BE',
          600: '#3B7BA4',
        },
        // Surfaces — consolidates #F9F9F9 / #F7F7F7 / #F9FAFB / #eef5f9 /
        // #F3F6FB / #E7EDF8 / #E2E7E8 into three deliberate steps.
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F9F9F9',
          muted: '#EEF2F8',
        },
        // Text — replaces the text-black/70|/80 alpha hack with solid,
        // blue-tinted values that stay consistent across backgrounds.
        content: {
          strong: '#151829',
          DEFAULT: '#454A61',
          muted: '#6E7389',
          subtle: '#9095A8',
        },
        success: { DEFAULT: '#12795A', surface: '#E7F4EF' },
        danger: { DEFAULT: '#A8322A', surface: '#FBEDEB' },

        /* ── Back-compat aliases so existing markup keeps compiling ── */
        'bright-snow': '#F9F9F9',
        'icy-blue': '#A1CEE5',
        'true-cobalt': '#2A2D7C',
        'deep-navy': { DEFAULT: '#15174F', dark: '#0B0C39' },
        'prussian-blue': '#000022',
        primary: { DEFAULT: '#2A2D7C', dark: '#15174F' },
        secondary: { DEFAULT: '#A1CEE5', light: '#F9F9F9' },
        background: { light: '#F9F9F9', alternate: '#FFFFFF' },
      },

      fontFamily: {
        sans: [
          '"DM Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"',
          'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
        signature: ['"Alex Brush"', 'cursive'],
      },

      // Fluid scale — the old `44` was a fixed 2.75rem at every viewport.
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.14em', fontWeight: '500' }],
        small: ['0.9375rem', { lineHeight: '1.6', letterSpacing: '-0.006em' }],
        body: ['1.0625rem', { lineHeight: '1.65', letterSpacing: '-0.01em' }],
        lead: [fluid(17, 20), { lineHeight: '1.6', letterSpacing: '-0.012em', fontWeight: '300' }],
        h4: [fluid(18, 22), { lineHeight: '1.35', letterSpacing: '-0.014em', fontWeight: '600' }],
        h3: [fluid(22, 30), { lineHeight: '1.25', letterSpacing: '-0.018em', fontWeight: '600' }],
        h2: [fluid(28, 42), { lineHeight: '1.18', letterSpacing: '-0.022em', fontWeight: '600' }],
        h1: [fluid(34, 52), { lineHeight: '1.1', letterSpacing: '-0.026em', fontWeight: '600' }],
        display: [fluid(40, 64), { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '600' }],

        /* ── Back-compat ── */
        18: ['1.125rem', { lineHeight: '140%', letterSpacing: '-0.0125em', fontWeight: '300' }],
        44: ['2.75rem', { lineHeight: '120%', letterSpacing: '-0.01em', fontWeight: '600' }],
        subheading: ['0.9rem', { lineHeight: '160%', fontWeight: '300' }],
      },

      maxWidth: {
        shell: '1600px',   // navigation + hero
        content: '1280px', // standard section width
        measure: '68ch',   // prose line length
      },

      // Navy-tinted elevation. Black shadows over a cold palette read muddy.
      boxShadow: {
        soft: '0 1px 2px rgba(21,23,79,0.04), 0 4px 12px rgba(21,23,79,0.06)',
        card: '0 2px 4px rgba(21,23,79,0.04), 0 12px 32px rgba(21,23,79,0.08)',
        lift: '0 8px 16px rgba(21,23,79,0.06), 0 24px 56px rgba(21,23,79,0.12)',
        float: '0 16px 32px rgba(21,23,79,0.10), 0 40px 80px rgba(21,23,79,0.16)',
        'inner-hairline': 'inset 0 0 0 1px rgba(21,23,79,0.07)',
      },

      borderRadius: { xl2: '1.25rem', xl3: '1.75rem', xl4: '2.5rem' },

      spacing: { 18: '4.5rem', 88: '22rem', 104: '26rem', 112: '28rem', 128: '32rem' },
      lineHeight: { body: '140%', heading: '120%' },
      letterSpacing: { body: '-0.0125em', heading: '-0.01em' },
      fontWeight: { light: '300', semibold: '600' },

      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
