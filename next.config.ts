/**
 * File: next.config.ts
 * Purpose: Production-ready Next.js configuration for OSR Boilerplate Web
 * Project: osr.boilerplate-web
 * Author: Open Source Rocks (https://opensource.rocks)
 * License: MIT
 *
 * Features:
 * - Advanced security headers with CSP
 * - Performance optimizations for Radix UI components
 * - Internationalization support with next-intl
 * - Bundle analysis integration
 * - Development and production optimizations
 * - Tailwind CSS v4+ compatibility
 */
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE === 'true';

// Cache configuration constants
const CACHE_ONE_YEAR = 'public, max-age=31536000, immutable';
const CACHE_ONE_WEEK = 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400';
const CACHE_ONE_DAY = 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600';
const CACHE_NO_CACHE = 'no-cache, no-store, must-revalidate';

const nextConfig: NextConfig = {
  // === Core Configuration ===
  output: 'standalone',
  distDir: '.next',
  trailingSlash: false,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,

  // === Image Optimization ===
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      //   port: '',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.jsdelivr.net',
      //   port: '',
      //   pathname: '/gh/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'avatars.githubusercontent.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },

  // === External Packages Configuration ===
  serverExternalPackages: ['sharp'],

  // === Turbopack Configuration ===
  ...(isDevelopment && {
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  }),

  // === Experimental Features ===
  experimental: {
    // Performance optimizations for your specific dependencies
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'date-fns',
      'recharts',
      'cmdk',
      'react-hook-form',
      'zod',
    ],

    // Modern features
    typedRoutes: true,

    // Caching improvements
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  // === TypeScript Configuration ===
  typescript: {
    ignoreBuildErrors: isDevelopment,
    tsconfigPath: './tsconfig.json',
  },

  // === ESLint Configuration ===
  eslint: {
    dirs: ['src', 'app', 'components', 'lib', 'hooks', 'utils'],
    ignoreDuringBuilds: false,
  },

  // === Compiler Optimizations ===
  compiler: {
    removeConsole: isProduction
      ? {
          exclude: ['error', 'warn', 'info'],
        }
      : false,
    reactRemoveProperties: isProduction,
  },

  // === Production Optimizations ===
  ...(isProduction && {
    swcMinify: true,
    optimizeFonts: true,
    compress: true,
    productionBrowserSourceMaps: false,

    // Advanced tree shaking for your dependencies
    modularizeImports: {
      'lucide-react': {
        transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
        preventFullImport: true,
      },
      '@radix-ui/react-icons': {
        transform: '@radix-ui/react-icons/{{ member }}',
        preventFullImport: true,
      },
      'date-fns': {
        transform: 'date-fns/{{ member }}',
        preventFullImport: true,
      },
    },
  }),

  // === Development Optimizations ===
  ...(isDevelopment && {
    // Fast refresh improvements
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 5,
    },
  }),

  // === Webpack Configuration ===
  webpack: (config, { dev, isServer, webpack }) => {
    // Bundle analyzer integration
    if (isAnalyze && !isServer) {
      const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')();
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: '../analyze/bundle-analysis.html',
          defaultSizes: 'gzip',
        }),
      );
    }

    // Production optimizations
    if (isProduction && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,

            // Radix UI components
            radix: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: 'radix-ui',
              priority: 30,
              chunks: 'all',
            },

            // React ecosystem
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-hook-form)[\\/]/,
              name: 'react-vendor',
              priority: 25,
              chunks: 'all',
            },

            // UI utilities
            ui: {
              test: /[\\/]node_modules[\\/](lucide-react|cmdk|sonner|vaul|class-variance-authority|clsx|tailwind-merge)[\\/]/,
              name: 'ui-vendor',
              priority: 20,
              chunks: 'all',
            },

            // Chart libraries
            charts: {
              test: /[\\/]node_modules[\\/](recharts|d3-.*)[\\/]/,
              name: 'charts-vendor',
              priority: 20,
              chunks: 'all',
            },

            // General vendor
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              chunks: 'all',
            },

            // Common modules
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
              chunks: 'all',
            },
          },
        },
      };
    }

    // Resolve aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
      '@/components': './src/components',
      '@/lib': './src/lib',
      '@/hooks': './src/hooks',
      '@/utils': './src/utils',
      '@/types': './src/types',
    };

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // === Security Headers ===
  async headers() {
    const securityHeaders = [
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      ...(isProduction
        ? [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000; includeSubDomains; preload',
            },
          ]
        : []),
      {
        key: 'Permissions-Policy',
        value: [
          'camera=()',
          'microphone=()',
          'geolocation=()',
          'interest-cohort=()',
          'payment=()',
          'usb=()',
          'bluetooth=()',
          'accelerometer=()',
          'gyroscope=()',
          'magnetometer=()',
        ].join(', '),
      },
    ];

    // Enhanced CSP for production
    const contentSecurityPolicy = isProduction
      ? {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: blob: https: https://images.unsplash.com https://cdn.jsdelivr.net https://avatars.githubusercontent.com",
            "connect-src 'self' https://vitals.vercel-insights.com https://api.github.com",
            "media-src 'self' data: blob:",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            'upgrade-insecure-requests',
          ].join('; '),
        }
      : null;

    return [
      // Security headers for all routes
      {
        source: '/(.*)',
        headers: [...securityHeaders, ...(contentSecurityPolicy ? [contentSecurityPolicy] : [])],
      },

      // Static assets - Long term caching
      {
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: CACHE_ONE_WEEK }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: CACHE_ONE_YEAR }],
      },
      {
        source: '/icons/:path*',
        headers: [{ key: 'Cache-Control', value: CACHE_ONE_YEAR }],
      },

      // Fonts
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: CACHE_ONE_YEAR },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },

      // JS and CSS files
      {
        source: '/static/(.*)',
        headers: [{ key: 'Cache-Control', value: CACHE_ONE_YEAR }],
      },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: CACHE_ONE_YEAR }],
      },

      // API routes - No caching
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: CACHE_NO_CACHE },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },

      // PWA files
      {
        source: '/manifest.json',
        headers: [
          { key: 'Cache-Control', value: CACHE_ONE_DAY },
          { key: 'Content-Type', value: 'application/manifest+json' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: CACHE_NO_CACHE },
          { key: 'Content-Type', value: 'application/javascript' },
        ],
      },

      // Sitemap and robots
      {
        source: '/(sitemap\\.xml|robots\\.txt)',
        headers: [{ key: 'Cache-Control', value: CACHE_ONE_DAY }],
      },
    ];
  },

  // === Redirects ===
  async redirects() {
    return [
      // Add your redirects here
      // Example:
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // === Rewrites ===
  async rewrites() {
    return [
      // Add your rewrites here
      // Example:
      // {
      //   source: '/api/proxy/:path*',
      //   destination: 'https://external-api.com/:path*',
      // },
    ];
  },
};

export default withNextIntl(nextConfig);
