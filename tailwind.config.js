const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        grifter: ['GRIFTER', 'sans-serif'],
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#D7D7D7',
        tertiary: '8A8A8A',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('children', '& > *');
    }),
    require('tailwindcss-debug-screens'),
  ],
};
