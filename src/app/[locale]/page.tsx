/**
 * File: src/app/[locale]/page.tsx
 * Purpose: Home page component with internationalization support
 * Author: platform.rocks
 * License: MIT
 */
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';
import { i18nConfig } from '@/config/locales';

import { ModeToggle } from '../../components/ui/mode-toggle';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const t = await getTranslations('HomePage');

  return (
    <div className='grid min-h-screen place-items-center'>
      <Card className='p-4'>
        {/* Header Section */}
        <CardContent>
          <div className='mb-4 flex items-center justify-center gap-4'>
            <Image
              src='/osr.png'
              alt={t('logoAlt')}
              width={32}
              height={32}
              priority
              className='size-8'
            />
            <h1 className='text-primary text-3xl font-bold'>Open Source Rocks</h1>
          </div>

          <p className='text-foreground text-center text-lg font-semibold'>{t('welcome')}</p>
        </CardContent>

        {/* Language Switcher */}
        <nav aria-label={t('languageSwitcher')} className='mt-8 flex'>
          <LocaleSwitcher currentLocale={locale} locales={i18nConfig.locales} />
          <ModeToggle />
        </nav>
      </Card>
    </div>
  );
}
