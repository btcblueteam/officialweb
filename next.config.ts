import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development practices
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compression
  compress: true,

  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security

  // Optimize external packages for server components
  serverExternalPackages: ['nodemailer'],

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(webp|png|jpg|svg|ico|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
