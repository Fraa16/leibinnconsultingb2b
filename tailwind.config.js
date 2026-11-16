/** @type {import('tailwindcss').Config} */

/**
 * Leibinn Consulting design system.
 *
 * Aligned to the brand's design handoffs (Benefits B2B, LP1 and the v4 real
 * estate page). Those three siblings share a DNA — Instrument Sans / Host
 * Grotesk grotesks set very large and tight, a short rule before every caps
 * eyebrow, pill buttons and nav, generous radii, alternating inset light
 * panels against full-bleed dark, and figures set in tabular numerals.
 *
 * Per the brief this site keeps its own blues rather than the Benefits page's
 * cream-and-gold: ink-600 #2A2D7C stays the brand and ice #A1CEE5 the accent.
 * The one colour taken from the handoff is ink-950 #000022, which the Benefits
 * design calls `navy` and which already existed here as `prussian-blue`.
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
          50: '#F2F4FA',
          100: '#E3E7F3',
          200: '#C5CCE6',
          300: '#98A3CE',
          400: '#6472AC',
          500: '#3D458F',
          600: '#2A2D7C', // brand cobalt — identity + primary actions
          700: '#202266',
          800: '#15174F', // deep navy
          900: '#0B0C39',
          950: '#000022', // the handoff's `navy`; was `prussian-blue` here
        },
        ice: {
          50: '#F1F8FC',
          100: '#E2F0F8',
          200: '#C4E2F0',
          300: '#A1CEE5', // brand ice — the accent, as gold is on the B2B page
          400: '#75AED4',
          500: '#4F92BE',
          600: '#3B7BA4',
        },

        canvas: '#F5F6F9',
        panel: '#FFFFFF',
        raised: '#FAFBFD',

        line: {
          DEFAULT: '#E6E9F0',
          strong: '#D3D8E4',
          onInk: 'rgba(255,255,255,0.10)',
          onInkStrong: 'rgba(255,255,255,0.18)',
        },

        content: {
          strong: '#0D1022',
          DEFAULT: '#565C6E',
          muted: '#868CA0',
          faint: '#A9AEBE',
        },

        success: { DEFAULT: '#12795A', surface: '#E7F4EF' },
        danger: { DEFAULT: '#A33B2B', surface: '#FBEDEB' },

        /* ── Back-compat aliases ── */
        'bright-snow': '#F9F9F9',
        'icy-blue': '#A1CEE5',
        'true-cobalt': '#2A2D7C',
        'deep-navy': { DEFAULT: '#15174F', dark: '#0B0C39' },
        'prussian-blue': '#000022',
        primary: { DEFAULT: '#2A2D7C', dark: '#15174F' },
        secondary: { DEFAULT: '#A1CEE5', light: '#F9F9F9' },
        surface: { DEFAULT: '#FFFFFF', subtle: '#F5F6F9', muted: '#EDF0F6' },
      },

      fontFamily: {
        // Instrument Sans is the Benefits page's face in the brand handoff.
        sans: [
          '"Instrument Sans Variable"', '"Instrument Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"',
          'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
        signature: ['"Alex Brush"', 'cursive'],
      },

      /*
       * The handoff's scale: headlines far larger and tighter than a default
       * build would set them, body text modest, labels small and tracked.
       */
      fontSize: {
        meta: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.07em', fontWeight: '600' }],
        label: ['0.8125rem', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '600' }],
        small: ['0.9375rem', { lineHeight: '1.6', letterSpacing: '-0.004em' }],
        body: ['1.0625rem', { lineHeight: '1.6', letterSpacing: '-0.008em' }],
        lead: [fluid(17, 20), { lineHeight: '1.55', letterSpacing: '-0.012em' }],
        h4: [fluid(18, 22), { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '500' }],
        h3: [fluid(20, 26), { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '500' }],
        h2: [fluid(36, 64), { lineHeight: '1.0', letterSpacing: '-0.045em', fontWeight: '500' }],
        h1: [fluid(40, 72), { lineHeight: '1.0', letterSpacing: '-0.045em', fontWeight: '500' }],
        giant: [fluid(44, 88), { lineHeight: '0.98', letterSpacing: '-0.05em', fontWeight: '500' }],
        stat: [fluid(36, 56), { lineHeight: '1', letterSpacing: '-0.05em', fontWeight: '500' }],
        total: [fluid(48, 96), { lineHeight: '1', letterSpacing: '-0.055em', fontWeight: '500' }],

        /* ── Back-compat ── */
        display: [fluid(40, 72), { lineHeight: '1.0', letterSpacing: '-0.045em', fontWeight: '500' }],
        eyebrow: ['0.8125rem', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '600' }],
        subheading: ['0.9rem', { lineHeight: '160%', fontWeight: '300' }],
        18: ['1.125rem', { lineHeight: '140%', letterSpacing: '-0.0125em', fontWeight: '300' }],
        44: ['2.75rem', { lineHeight: '120%', letterSpacing: '-0.01em', fontWeight: '600' }],
      },

      maxWidth: {
        nav: '1120px',
        shell: '1280px',
        content: '1280px',
        measure: '62ch',
      },

      boxShadow: {
        nav: '0 10px 40px rgba(0,0,34,0.06)',
        cta: '0 14px 40px rgba(0,0,34,0.18)',
        float: '0 24px 48px -24px rgba(13,26,45,0.45)',
        onDark: '0 30px 60px -24px rgba(0,0,0,0.7)',
      },

      // pill · container · card · inner
      borderRadius: {
        xl2: '1rem',
        xl3: '1.5rem',
        xl4: '2rem',
      },

      spacing: { 18: '4.5rem', 88: '22rem', 104: '26rem', 112: '28rem', 128: '32rem' },
      lineHeight: { body: '140%', heading: '120%' },
      letterSpacing: { body: '-0.0125em', heading: '-0.01em' },
      fontWeight: { light: '300', semibold: '600' },

      transitionTimingFunction: {
        // The handoff's easing, used for reveals, thumbs and accordions.
        brand: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
        entrance: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
