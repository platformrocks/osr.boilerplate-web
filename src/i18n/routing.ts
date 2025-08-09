/**
 * File: src/i18n/routing.ts
 * Purpose: Internationalization routing configuration for supported locales
 * Author: platform.rocks
 * License: MIT
 */
import { defineRouting } from 'next-intl/routing';

import { i18nConfig, localeUtils } from '@/config/locales';

export const routing = defineRouting({
  locales: localeUtils.getAllLocaleCodes(),
  defaultLocale: i18nConfig.defaultLocale,
});
