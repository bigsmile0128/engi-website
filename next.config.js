// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      exclude: /\/img\/about\/companies/
    });

    return config;
  },
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536],
    minimumCacheTTL: 60,
    domains: ['engi-email-template.s3.us-west-2.amazonaws.com', 'via.placeholder.com'],
  },
  experimental: {
    appDir: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
