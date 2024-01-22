// @ts-check

const isDev = !(process.env.NODE_ENV === "production");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: !isDev,
  },
  eslint: {
    ignoreDuringBuilds: !isDev,
  },
  typescript: {
    ignoreBuildErrors: !isDev,
  },
};

export default nextConfig;
