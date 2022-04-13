const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        grifter: ['GRIFTER', 'sans-serif'],
      },
      backgroundImage: {
        landing: "url('/img/landing.svg')",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('children', '& > *');
    }),
  ],
};
