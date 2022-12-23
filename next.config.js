// const withTM = require('next-transpile-modules')(['echarts']);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    runtime: 'nodejs',
    // transpilePackages: true,
  },
};

module.exports =
  //  withTM(
  nextConfig;
// );
