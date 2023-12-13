/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [path.join(__dirname, './src/**/*.(js|jsx|ts|tsx)')],
  theme: {
    screens: {
      xs: '475px',
      tablet: defaultTheme.screens.sm,
      laptop: defaultTheme.screens.md,
      desktop: defaultTheme.screens.lg,
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
        'purple-primary': '#BA54EC',
      },
      backgroundColor: {
        secondary: '#232323',
        dropdown: '#161B284D',
      },
      spacing: {
        88: '22rem',
      },
      maxWidth: {
        50: '50%'
      },
      height: {
        '125p': '125%',
      },
      width: {
        '400p': '400%',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('children', '& > *');
    }),
    require('@headlessui/tailwindcss')
  ],
};
