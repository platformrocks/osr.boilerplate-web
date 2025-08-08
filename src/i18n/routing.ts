/**
 * File: src/i18n/routing.ts
 * Purpose: Internationalization routing configuration for supported locales
 * Author: platform.rocks
 * License: MIT
 */
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt-BR', 'en-US', 'es-ES'],
  defaultLocale: 'pt-BR',
});
