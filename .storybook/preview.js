// workaround for storybook, tailwind 3, and webpack 5 compatibility issues
// https://github.com/tailwindlabs/tailwindcss/issues/6314
import '!style-loader!css-loader!postcss-loader!../src/styles/globals.css';
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';

import '~/utils/datetime/dayjs-extend';
import { themes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  screenshot: {
    waitFor: 'fontLoading',
  },
  darkMode: {
    dark: {
      ...themes.dark,
      // appBg: 'black',
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#333',
      },
    ],
  },
  layout: 'fullscreen',
};
