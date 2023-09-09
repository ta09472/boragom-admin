/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
