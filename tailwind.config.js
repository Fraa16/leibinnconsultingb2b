/** @type {import('tailwindcss').Config} */

/**
 * Leibinn Consulting design system.
 *
 * Structure comes from hairline borders, not drop shadows. Shadows are
 * reserved for things that genuinely float (the nav, the form card); every
 * other surface is defined by a 1px line and a flat fill. That is the single
 * biggest difference between a considered layout and a default Tailwind one.
 *
 * The navy identity is unchanged — ink-600 #2A2D7C is still the brand and
 * every original hex survives as a named step. The neutrals around it were
 * retuned: the old greys were muddy next to the navy, so they now carry a
 * slight cool cast that belongs to the same family.
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
          950: '#050621', // darkest anchor — footer
        },
        ice: {
          50: '#F1F8FC',
          100: '#E2F0F8',
          200: '#C4E2F0',
          300: '#A1CEE5', // brand ice
          400: '#75AED4',
          500: '#4F92BE',
          600: '#3B7BA4',
        },

        // Surfaces. `canvas` is the page, `panel` sits on it, `raised` is the
        // subtle step used inside panels.
        canvas: '#F5F6F9',
        panel: '#FFFFFF',
        raised: '#FAFBFD',

        // Hairlines — the primary structural device.
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
        danger: { DEFAULT: '#A8322A', surface: '#FBEDEB' },

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
        sans: [
          '"DM Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"',
          'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
        signature: ['"Alex Brush"', 'cursive'],
      },

      /*
       * Wider contrast between the extremes than before: bigger headlines,
       * smaller and greyer body, and a genuinely tiny tracked label. Timid
       * type contrast was a large part of why the old build read flat.
       */
      fontSize: {
        label: ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.13em', fontWeight: '600' }],
        small: ['0.9375rem', { lineHeight: '1.65', letterSpacing: '-0.006em' }],
        body: ['1.0313rem', { lineHeight: '1.7', letterSpacing: '-0.009em' }],
        lead: [fluid(17, 20), { lineHeight: '1.6', letterSpacing: '-0.014em', fontWeight: '300' }],
        h4: [fluid(18, 21), { lineHeight: '1.35', letterSpacing: '-0.018em', fontWeight: '600' }],
        h3: [fluid(22, 30), { lineHeight: '1.22', letterSpacing: '-0.023em', fontWeight: '600' }],
        h2: [fluid(30, 50), { lineHeight: '1.1', letterSpacing: '-0.032em', fontWeight: '600' }],
        h1: [fluid(36, 60), { lineHeight: '1.06', letterSpacing: '-0.036em', fontWeight: '600' }],
        display: [fluid(40, 68), { lineHeight: '1.04', letterSpacing: '-0.04em', fontWeight: '600' }],

        /* ── Back-compat ── */
        eyebrow: ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.13em', fontWeight: '600' }],
        subheading: ['0.9rem', { lineHeight: '160%', fontWeight: '300' }],
        18: ['1.125rem', { lineHeight: '140%', letterSpacing: '-0.0125em', fontWeight: '300' }],
        44: ['2.75rem', { lineHeight: '120%', letterSpacing: '-0.01em', fontWeight: '600' }],
      },

      maxWidth: {
        shell: '1440px',
        content: '1240px',
        measure: '64ch',
      },

      // Only for things that actually float.
      boxShadow: {
        nav: '0 1px 2px rgba(13,16,34,0.04), 0 8px 24px rgba(13,16,34,0.06)',
        float: '0 2px 4px rgba(13,16,34,0.03), 0 18px 48px rgba(13,16,34,0.10)',
        ink: '0 10px 30px rgba(42,45,124,0.22)',
      },

      borderRadius: { xl2: '0.875rem', xl3: '1.25rem', xl4: '1.75rem' },

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
