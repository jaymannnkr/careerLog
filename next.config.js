/** @type {import('next').NextConfig} */
const { version } = require("./package.json");

const hostDomain = process.env.HOST_DOMAIN || "localhost";

const nextConfig = {
  swcMinify: true,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
  publicRuntimeConfig: {
    version,
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: [hostDomain],
    },
  },

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
};

module.exports = nextConfig;
