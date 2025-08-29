/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod.spline.design",
      },
    ],
  },
};

export default nextConfig;
