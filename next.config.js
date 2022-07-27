const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
  output: 'standalone',
};

module.exports = withBundleAnalyzer(nextConfig);
