const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
    'storybook-dark-mode',
  ],
  webpackFinal: async (config, { configType }) => {
    // Removing the global alias as it conflicts with the global npm pkg
    const { global, ...alias } = config.resolve.alias;
    config.resolve.alias = {
      ...alias,
      '~/components': path.resolve(__dirname, '../src/components'),
      '~/types': path.resolve(__dirname, '../src/types'),
      '~/styles': path.resolve(__dirname, '../src/styles'),
      '~/utils': path.resolve(__dirname, '../src/utils'),
      '/img': path.resolve(__dirname, '../public/img'),
    };
    return config;
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};
