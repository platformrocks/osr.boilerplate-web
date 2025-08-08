/**
 * file: src/components/ui/locale-switcher.tsx
 * Purpose: Locale switcher component for changing application language
 * Author: platform.rocks
 * License: MIT
 */
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface LocaleSwitcherProps {
  currentLocale: string;
  locales: ReadonlyArray<{ readonly code: string; readonly label: string; readonly name: string }>;
}

/**
 * LocaleSwitcher component for changing application language
 * @param currentLocale - The current locale
 * @param locales - The list of supported locales
 * @returns JSX.Element
 */
export function LocaleSwitcher({ currentLocale, locales }: LocaleSwitcherProps) {
  const t = useTranslations('common');

  return (
    <div className='flex flex-wrap items-center justify-center gap-2'>
      {locales.map((locale) => {
        const isActive = currentLocale === locale.code;

        return (
          <Link
            key={locale.code}
            href={`/${locale.code}`}
            className={`hover:bg-accent hover:text-accent-foreground focus:ring-ring inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            } `}
            aria-current={isActive ? 'page' : undefined}
            prefetch={false}
          >
            {locale.name}
            <span className='sr-only'>{isActive ? ` (${t('currentLanguage')})` : ''}</span>
          </Link>
        );
      })}
    </div>
  );
}
