const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      // don't include images used for tailwind background
      // exclude: path.resolve(__dirname, 'public/img'),
      use: ['@svgr/webpack'],
    });

    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 8889,
        openAnalyzer: true,
      })
    );

    return config;
  },
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536],
    minimumCacheTTL: 60,
    domains: ['engi-email-template.s3.us-west-2.amazonaws.com'],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
