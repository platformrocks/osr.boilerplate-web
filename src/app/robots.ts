/**
 * File: src/app/robots.ts
 * Purpose: Robots.txt generation for search engine crawling configuration
 * Author: platform.rocks
 * License: MIT
 */
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
