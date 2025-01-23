/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias["yjs"] = path.resolve(__dirname, "node_modules/yjs");
    }

    return config;
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
