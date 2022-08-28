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
    console.log('rule.test', rule.test);
    if (rule.test?.source?.includes('|svg')) {
      console.log(rule.test.source);
      rule.test = new RegExp(
        rule.test.source.replace('|svg', ''),
        rule.test.flags
      );
    }
  });

  console.log(config.module.rules);
  // Return the altered config
  return config;
};
