# i18n Centralization Architecture

## Overview

This document describes the centralized internationalization (i18n) configuration implemented in the application. All locale-related logic now flows through a single source of truth:
`src/config/locales.ts`.

## Centralized Configuration Structure

### Main Configuration Object

```typescript
export const i18nConfig = {
  /** Default locale for the application */
  defaultLocale: 'pt-BR',

  /** Supported locales configuration */
  locales: [
    {
      code: 'pt-BR',
      name: 'Português (Brasil)',
      flag: '🇧🇷',
      routePrefix: '/pt',
      metadataCode: 'pt',
      dir: 'ltr',
    },
    {
      code: 'en-US',
      name: 'English (US)',
      flag: '🇺🇸',
      routePrefix: '/en',
      metadataCode: 'en-US',
      dir: 'ltr',
    },
    {
      code: 'es-ES',
      name: 'Español (España)',
      flag: '🇪🇸',
      routePrefix: '/es',
      metadataCode: 'es',
      dir: 'ltr',
    },
  ] as const,

  /** Base domain for the application */
  baseDomain: 'https://opensource.rocks',
} as const;
```

### Helper Utilities

The `localeUtils` object provides reusable methods for locale handling:

- `getAllLocaleCodes()`: Get all supported locale codes
- `isValidLocale(locale)`: Check if a locale code is supported
- `getLocaleConfig(code)`: Get locale configuration by code
- `isDefaultLocale(locale)`: Check if a locale is the default locale
- `getLocalizedPath(path, locale)`: Generate localized path for a route
- `generateAlternateLinks(path)`: Generate alternate language links for metadata
- `generateSitemapEntries(paths)`: Generate sitemap entries with alternates
- `getTextDirection(locale)`: Get text direction for a locale

## Usage Examples

### 1. Routing Configuration

**File:** `src/i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';

import { i18nConfig, localeUtils } from '@/config/locales';

export const routing = defineRouting({
  locales: localeUtils.getAllLocaleCodes(),
  defaultLocale: i18nConfig.defaultLocale,
});
```

### 2. Layout Metadata Generation

**File:** `src/app/[locale]/layout.tsx`

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!localeUtils.isValidLocale(locale)) {
    notFound();
  }

  return {
    // ... other metadata
    alternates: {
      canonical: '/',
      languages: localeUtils.generateAlternateLinks(),
    },
    openGraph: {
      // ... other openGraph data
      locale: locale as LocaleCode,
    },
  };
}
```

### 3. Sitemap Generation

**File:** `src/app/sitemap.ts`

```typescript
import { localeUtils } from '@/config/locales';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', // Home page
    '/about',
    '/blog',
  ];

  return localeUtils.generateSitemapEntries(routes);
}
```

### 4. Locale Switcher Component

**File:** `src/components/ui/locale-switcher.tsx`

```typescript
import { useTranslations } from 'next-intl';
import { LocaleConfig } from '@/config/locales';
import { Link } from '@/i18n/navigation';

interface LocaleSwitcherProps {
  currentLocale: string;
  locales: readonly LocaleConfig[];
}

export function LocaleSwitcher({ currentLocale, locales }: LocaleSwitcherProps) {
  const t = useTranslations('common');

  return (
    <div className='flex flex-wrap items-center justify-center gap-2'>
      {locales.map((locale) => {
        const isActive = currentLocale === locale.code;

        return (
          <Link
            key={locale.code}
            href="/"
            locale={locale.code}
            className={/* styling classes */}
            aria-current={isActive ? 'page' : undefined}
            prefetch={false}
          >
            {locale.name}
            <span className='sr-only'>
              {isActive ? ` (${t('currentLanguage')})` : ''}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
```

**Key Implementation Notes:**

- Uses internationalized `Link` from `@/i18n/navigation`
- Uses `locale={locale.code}` prop for proper routing
- Avoids manual URL construction to prevent routing issues

### 5. Page Implementation

**File:** `src/app/[locale]/page.tsx`

```typescript
import { i18nConfig } from '@/config/locales';

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <div>
      {/* ... page content */}
      <LocaleSwitcher currentLocale={locale} locales={i18nConfig.locales} />
    </div>
  );
}
```

## Benefits of Centralization

### 1. Single Source of Truth

- All locale configuration is in one place
- No hardcoded locale checks scattered throughout the codebase
- Easy to add/remove locales

### 2. Type Safety

- TypeScript ensures all locale codes are valid
- Compile-time checking for locale-related operations

### 3. Consistency

- All components use the same locale configuration
- Uniform route prefixes and metadata codes
- Consistent text direction handling

### 4. Maintainability

- Changes to locale configuration require updates in only one file
- Helper utilities provide reusable patterns
- Clear separation of concerns

### 5. YAGNI Compliance

- Only implements currently necessary features
- No over-engineering for future requirements
- Clean, focused API surface

## Migration Path

### From Hardcoded Checks

```typescript
// Before
if (locale === 'pt-BR') {
  // do something
}

// After
if (localeUtils.isDefaultLocale(locale)) {
  // do something
}
```

### From Direct Imports

```typescript
// Before
import { SUPPORTED_LOCALES } from '@/config/locales';
// After
import { i18nConfig } from '@/config/locales';
```

### From Manual URL Construction

```typescript
// Before
const url = `/${locale}/about`;

// After
const url = localeUtils.getLocalizedPath('/about', locale);
```

## Future Considerations

### RTL Languages

The configuration already includes `dir` property for text direction. When RTL languages are added, the `getTextDirection()` utility will handle this automatically.

### Additional Metadata

The locale configuration object can be extended with additional properties (timezone, currency, date format) without breaking existing code.

### Route Customization

Each locale can have custom route prefixes, enabling SEO-friendly URLs in different languages.

## Best Practices

1. **Always use utilities**: Avoid direct locale comparisons; use helper functions
2. **Type safety**: Use `LocaleCode` type instead of string when possible
3. **Consistent imports**: Import from the centralized config, not individual utilities
4. **Documentation**: Keep inline documentation updated when extending the configuration

## Summary

The i18n centralization implementation is now complete and working correctly. The key fixes included:

1. **Proper Navigation**: Using the internationalized `Link` component from `@/i18n/navigation` instead of the regular Next.js `Link` to ensure proper locale routing.

2. **Centralized Configuration**: All locale settings consolidated in `src/config/locales.ts` with helper utilities for consistent usage across the application.

3. **Type Safety**: Strong TypeScript typing with `LocaleCode` and `LocaleConfig` types derived from the configuration.

4. **SEO Optimization**: Proper sitemap generation and metadata with alternate language links.

5. **Route Handling**: Fixed URL generation to match Next.js routing expectations (`/pt-BR/`, `/en-US/`, `/es-ES/`).

The implementation successfully eliminates hardcoded locale checks, provides consistent APIs, and enables easy extension while following the YAGNI principle. The locale switching now works correctly
without generating malformed URLs like `/pt-BR/en`.
