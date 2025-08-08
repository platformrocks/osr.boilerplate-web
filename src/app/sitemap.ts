/**
 * File: src/app/sitemap.ts
 * Purpose: XML sitemap generation with internationalization support
 * Author: platform.rocks
 * License: MIT
 */
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://opensource.rocks',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://opensource.rocks/en-US',
          es: 'https://opensource.rocks/es-ES',
          pt: 'https://opensource.rocks/pt-BR',
        },
      },
    },
    {
      url: 'https://opensource.rocks/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://opensource.rocks/en-US/about',
          es: 'https://opensource.rocks/es-ES/about',
          pt: 'https://opensource.rocks/pt-BR/about',
        },
      },
    },
    {
      url: 'https://opensource.rocks/blog',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://opensource.rocks/en-US/blog',
          es: 'https://opensource.rocks/es-ES/blog',
          pt: 'https://opensource.rocks/pt-BR/blog',
        },
      },
    },
  ];
}
