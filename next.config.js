/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
