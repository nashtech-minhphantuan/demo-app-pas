/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ["static.wikia.nocookie.net", "picsum.photos"],
  },
};

module.exports = nextConfig;
