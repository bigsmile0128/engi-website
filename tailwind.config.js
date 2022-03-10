module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        grifter: ['GRIFTER', 'sans-serif'],
      },
      backgroundImage: {
        landing: "url('/public/landing.svg')",
      },
    },
  },
  plugins: [],
};
