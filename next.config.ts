import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "career-coach-website.vercel.app",
        pathname: "/coaches/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dpgw6oalj/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
