/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    PUBLIC_URL:
      process.env.NODE_ENV === "production"
        ? require("./package.json").homepage
        : process.env.FORWARD_DOMAIN || "http://localhost:3000",
  },
  images: {
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
