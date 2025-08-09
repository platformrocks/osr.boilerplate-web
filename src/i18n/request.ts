/**
 * File: src/i18n/request.ts
 * Purpose: Request configuration for loading internationalization messages
 * Author: platform.rocks
 * License: MIT
 */
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { localeUtils } from '@/config/locales';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  // Use the file mapping from locales configuration
  const messageFile = localeUtils.getMessageFile(locale);

  return {
    locale,
    messages: (await import(`./messages/${messageFile}.json`)).default,
  };
});
