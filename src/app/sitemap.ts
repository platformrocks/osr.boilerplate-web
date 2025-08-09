/**
 * File: src/app/sitemap.ts
 * Purpose: XML sitemap generation with internationalization support
 * Author: platform.rocks
 * License: MIT
 */
import type { MetadataRoute } from 'next';

import { localeUtils } from '@/config/locales';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', // Home page
    '/about',
    '/blog',
  ];

  return localeUtils.generateSitemapEntries(routes);
}
