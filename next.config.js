/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow any host so the Arena live-preview proxy can reach the dev server
  experimental: {
    allowedDevOrigins: ['*'],
  },
};

module.exports = nextConfig;
