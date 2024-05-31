/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hcvtywdctockggthogby.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
