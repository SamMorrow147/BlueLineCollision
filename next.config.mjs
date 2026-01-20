/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'use.typekit.net',
      },
    ],
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
