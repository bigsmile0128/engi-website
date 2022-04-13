const path = require('path');

module.exports = {
  stories: ['../app/**/*.stories.mdx', '../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-backgrounds',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '~': path.resolve(__dirname, '../app/'),
      },
    },
  }),
};
