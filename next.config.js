/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    PUBLIC_URL:
      process.env.NODE_ENV === "development"
        ? "/"
        : require("./package.json").homepage,
  },
  images: {
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
