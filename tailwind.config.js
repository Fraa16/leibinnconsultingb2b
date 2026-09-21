/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /* Locked brand palette. Anything not listed here is off-brand. */
      colors: {
        navy: {
          DEFAULT: '#2A2D7C',
          deep: '#15174F',
          black: '#0B0C39',
        },
        ice: '#A1CEE5',
        canvas: '#F9F9F9',

        /* Semantic aliases so components never reach for a raw hex. */
        ink: {
          DEFAULT: 'var(--lc-ink)',
          muted: 'var(--lc-ink-muted)',
          subtle: 'var(--lc-ink-subtle)',
        },
      },
      fontFamily: {
        sans: [
          '"DM Sans"',
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        block: 'var(--lc-r-block)',
        card: 'var(--lc-r-card)',
      },
      maxWidth: {
        content: '1240px',
      },
      transitionTimingFunction: {
        /* One easing curve for the whole site. */
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
