// workaround for storybook, tailwind 3, and webpack 5 compatibility issues
// https://github.com/tailwindlabs/tailwindcss/issues/6314
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import '!style-loader!css-loader!postcss-loader!../src/styles/globals.css';

import React from 'react';

import * as NextImage from 'next/image';
import * as NextFutureImage from 'next/future/image';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12
import { withScreenshot } from 'storycap-engi';

const queryClient = new QueryClient();

export const decorators = [
  (story) => (
    <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
  ),
  withScreenshot,
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  screenshot: {
    waitFor: 'fontLoading',
  },
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

Object.defineProperty(NextFutureImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
