const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        grifter: ['GRIFTER', 'sans-serif'],
      },
      backgroundImage: {
        landing: "url('~/public/img/landing.svg')",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('children', '& > *');
    }),
  ],
};
