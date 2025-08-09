/**
 * @fileoverview Centralized i18n configuration and utilities
 * @author Open Source Rocks
 * @since 1.0.0
 */

/**
 * Centralized internationalization configuration object
 * Single source of truth for all locale-related logic
 */
export const i18nConfig = {
  /** Default locale for the application - using simplified code */
  defaultLocale: 'pt',

  /** Supported locales configuration - using simplified codes for routes */
  locales: [
    {
      code: 'pt',
      fullCode: 'pt-BR',
      file: 'pt.json',
      name: 'Português (Brasil)',
      flag: '🇧🇷',
      metadataCode: 'pt',
      dir: 'ltr',
    },
    {
      code: 'en',
      fullCode: 'en-US',
      file: 'en.json',
      name: 'English (US)',
      flag: '🇺🇸',
      metadataCode: 'en-US',
      dir: 'ltr',
    },
    {
      code: 'es',
      fullCode: 'es-ES',
      file: 'es.json',
      name: 'Español (España)',
      flag: '🇪🇸',
      metadataCode: 'es',
      dir: 'ltr',
    },
  ] as const,

  /** Base domain for the application */
  baseDomain: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

/**
 * Type definitions derived from the configuration
 */
export type LocaleCode = (typeof i18nConfig.locales)[number]['code'];
export type LocaleConfig = (typeof i18nConfig.locales)[number];

/**
 * Helper utilities for locale handling
 */
export const localeUtils = {
  /**
   * Get all supported locale codes
   * @returns Array of locale codes
   */
  getAllLocaleCodes(): readonly LocaleCode[] {
    return i18nConfig.locales.map((locale) => locale.code);
  },

  /**
   * Check if a locale code is supported
   * @param locale - Locale code to validate
   * @returns Boolean indicating if locale is supported
   */
  isValidLocale(locale: string): locale is LocaleCode {
    return i18nConfig.locales.some((supportedLocale) => supportedLocale.code === locale);
  },

  /**
   * Get locale configuration by code
   * @param code - Locale code
   * @returns Locale configuration object or undefined
   */
  getLocaleConfig(code: string): LocaleConfig | undefined {
    return i18nConfig.locales.find((locale) => locale.code === code);
  },

  /**
   * Check if a locale is the default locale
   * @param locale - Locale code to check
   * @returns Boolean indicating if locale is default
   */
  isDefaultLocale(locale: string): boolean {
    return locale === i18nConfig.defaultLocale;
  },

  /**
   * Generate localized path for a given route
   * @param path - Base path (e.g., '/about')
   * @param locale - Locale code
   * @returns Localized path
   */
  getLocalizedPath(path: string, locale: LocaleCode): string {
    const localeConfig = this.getLocaleConfig(locale);
    if (!localeConfig) return path;

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  },

  /**
   * Generate alternate language links for metadata
   * @param path - Base path for the alternate links
   * @returns Object with language alternates
   */
  generateAlternateLinks(path: string = ''): Record<string, string> {
    const alternates: Record<string, string> = {};

    i18nConfig.locales.forEach((locale) => {
      // Use the simplified Next.js route structure but with fullCode for metadata
      const localizedPath = path === '' ? `/${locale.code}` : `/${locale.code}${path}`;
      const fullUrl = `${i18nConfig.baseDomain}${localizedPath}`;
      alternates[locale.fullCode] = fullUrl;
    });

    return alternates;
  },

  /**
   * Generate sitemap entries for all locales
   * @param paths - Array of paths to generate sitemap for
   * @returns Sitemap entries with alternates
   */
  generateSitemapEntries(paths: string[]) {
    // Generate entries for each locale
    const entries: Array<{
      url: string;
      lastModified: Date;
      alternates: { languages: Record<string, string> };
    }> = [];

    paths.forEach((path) => {
      i18nConfig.locales.forEach((locale) => {
        // Use simplified code for URL routes
        const localizedPath = path === '' ? `/${locale.code}` : `/${locale.code}${path}`;
        const url = `${i18nConfig.baseDomain}${localizedPath}`;

        // Generate alternates using fullCode for proper language tags
        const alternates: Record<string, string> = {};
        i18nConfig.locales.forEach((altLocale) => {
          const altPath = path === '' ? `/${altLocale.code}` : `/${altLocale.code}${path}`;
          alternates[altLocale.fullCode] = `${i18nConfig.baseDomain}${altPath}`;
        });

        entries.push({
          url,
          lastModified: new Date(),
          alternates: {
            languages: alternates,
          },
        });
      });
    });

    return entries;
  },

  /**
   * Get text direction for a locale
   * @param locale - Locale code
   * @returns Text direction ('ltr' or 'rtl')
   */
  getTextDirection(locale: LocaleCode): 'ltr' | 'rtl' {
    const localeConfig = this.getLocaleConfig(locale);
    return localeConfig?.dir || 'ltr';
  },

  /**
   * Get full locale code for HTML lang attribute and metadata
   * @param locale - Simplified locale code
   * @returns Full locale code (e.g., 'pt-BR', 'en-US', 'es-ES')
   */
  getFullCode(locale: LocaleCode): string {
    const localeConfig = this.getLocaleConfig(locale);
    return localeConfig?.fullCode || locale;
  },

  /**
   * Get message file name for locale
   * @param locale - Simplified locale code
   * @returns Message file name without extension (e.g., 'pt', 'en', 'es')
   */
  getMessageFile(locale: LocaleCode): string {
    const localeConfig = this.getLocaleConfig(locale);
    return localeConfig?.file.replace('.json', '') || locale;
  },
};

/**
 * Legacy export for backward compatibility
 * @deprecated Use i18nConfig.locales instead
 */
export const SUPPORTED_LOCALES = i18nConfig.locales;

/**
 * Legacy type export for backward compatibility
 * @deprecated Use LocaleCode instead
 */
export type SupportedLocale = LocaleCode;
