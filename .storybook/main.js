const path = require('path');

module.exports = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-mock/register',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~/components': path.resolve(__dirname, '../src/components'),
      '~/types': path.resolve(__dirname, '../src/types'),
      '~/styles': path.resolve(__dirname, '../src/styles'),
      '~/utils': path.resolve(__dirname, '../src/utils'),
    };

    return config;
  },
};
