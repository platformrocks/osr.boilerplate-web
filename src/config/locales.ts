export const SUPPORTED_LOCALES = [
  {
    code: 'pt-BR',
    label: '/pt-BR',
    name: 'Português (Brasil)',
    flag: '🇧🇷',
  },
  {
    code: 'en-US',
    label: '/en-US',
    name: 'English (US)',
    flag: '🇺🇸',
  },
  {
    code: 'es-ES',
    label: '/es-ES',
    name: 'Español (España)',
    flag: '🇪🇸',
  },
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]['code'];
