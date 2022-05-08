const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      // don't include images used for tailwind background
      exclude: path.resolve(__dirname, 'public/img'),
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, // proxy to back-end
      },
    ];
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
