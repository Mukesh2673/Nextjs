/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["squid-app-ja5vm.ondigitalocean.app"],
  },
  env: {
    BEARER_TOKEN: process.env.BEARER_TOKEN,
  },
};

module.exports = nextConfig;
