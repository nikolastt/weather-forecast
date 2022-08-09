/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["openweathermap.org"],
  },
};

module.exports = nextConfig;
