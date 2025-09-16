import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '**',
      },
    ],
  },
  // Allow video files from Sanity CDN
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "media-src 'self' https://cdn.sanity.io data: blob:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
