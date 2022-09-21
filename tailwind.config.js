const path = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [path.join(__dirname, './src/**/*.(js|jsx|ts|tsx)')],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        grifter: ['GRIFTER', 'sans-serif'],
        default: ['Helvetica Neue', 'Arial'],
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#D7D7D7',
        tertiary: '#8A8A8A',
        'green-primary': '#65FEB7',
        'orange-primary': '#F27B50',
        'red-primary': '#FF5F5F',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('children', '& > *');
    }),
    require('tailwindcss-debug-screens'),
    require('@tailwindcss/line-clamp'),
  ],
};
