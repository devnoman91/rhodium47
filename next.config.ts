import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable aggressive caching and optimization
  experimental: {
    useCache: true,
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
  },

  // Optimize images for performance
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.myshopify.com',
        port: '',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Optimize for common devices
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Smaller image sizes
    minimumCacheTTL: 31536000, // Cache images for 1 year
    dangerouslyAllowSVG: true, // Allow SVG optimization
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Configure quality levels for Next.js 16 compatibility
    qualities: [75, 85, 90, 95, 100],
  },

  // Compress all responses
  compress: true,

  // Production-grade headers for performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "media-src 'self' https://cdn.sanity.io data: blob:;",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Enable SWC minification for smaller bundles
  swcMinify: true,

  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true, // Enable strict mode for better performance warnings
};

export default nextConfig;
