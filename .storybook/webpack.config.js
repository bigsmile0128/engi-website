const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.unshift({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  config.module.rules.forEach((rule) => {
    if (rule.test?.source?.includes('|svg')) {
      rule.test = new RegExp(
        rule.test.source.replace('|svg', ''),
        rule.test.flags
      );
    }
  });

  config.resolve.fallback = {
    https: false,
    http: false,
    crypto: false,
    stream: false,
    path: false,
    url: false,
    os: false,
  };

  // Return the altered config
  return config;
};
