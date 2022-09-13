// workaround for storybook, tailwind 3, and webpack 5 compatibility issues
// https://github.com/tailwindlabs/tailwindcss/issues/6314
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import '!style-loader!css-loader!postcss-loader!../styles/globals.css';
import * as NextImage from 'next/image';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
