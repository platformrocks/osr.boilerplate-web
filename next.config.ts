/**
 * File: next.config.ts
 * Purpose: Next.js configuration with internationalization and security headers
 * Author: platform.rocks
 * License: MIT
 */
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  async headers() {
    const headers = [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];

    // CSP
    if (isProduction && headers[0]) {
      headers[0].headers.push({
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: blob: https://images.unsplash.com https://via.placeholder.com https://cdn.platform.rocks",
          "connect-src 'self' https://vitals.vercel-insights.com",
        ].join('; '),
      });
    }

    return headers;
  },

  compiler: {
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },

  output: 'standalone',
  distDir: '.next',

  ...(isDevelopment && {
    reactStrictMode: true,
    productionBrowserSourceMaps: false,
  }),

  ...(isProduction && {
    swcMinify: true,
    optimizeFonts: true,
    compress: true,
  }),

  trailingSlash: false,
  poweredByHeader: false,
  generateEtags: true,
};

export default withNextIntl(nextConfig);
