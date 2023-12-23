/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pbs.twimg.com",
      "i.imgur.com",
      "imgur.com",
      "link.storjshare.io",
      "firebasestorage.googleapis.com",
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
