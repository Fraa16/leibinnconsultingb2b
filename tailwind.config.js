/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        'bright-snow': '#F9F9F9',
        'icy-blue': '#A1CEE5',
        'true-cobalt': '#2A2D7C',
        'deep-navy': {
          DEFAULT: '#15174F',
          dark: '#0B0C39',
        },
        'prussian-blue': '#000022',
        primary: {
          DEFAULT: '#2A2D7C',
          dark: '#15174F',
        },
        secondary: {
          DEFAULT: '#A1CEE5',
          light: '#F9F9F9',
        },
        background: {
          light: '#F9F9F9',
          alternate: '#FFFFFF',
        },
        subheading: '#2A2D7C',
      },
      fontFamily: {
        sans: [
          '"DM Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        '18': ['1.125rem', { lineHeight: '140%', letterSpacing: '-0.0125em', fontWeight: '300' }],
        '44': ['2.75rem', { lineHeight: '120%', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subheading': ['0.9rem', { lineHeight: '160%', fontWeight: '300' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '104': '26rem',
        '112': '28rem',
        '128': '32rem',
      },
      lineHeight: {
        'body': '140%',
        'heading': '120%',
      },
      letterSpacing: {
        'body': '-0.0125em',
        'heading': '-0.01em',
      },
      fontWeight: {
        'light': '300',
        'semibold': '600',
      },
    },
  },
  plugins: [],
};
