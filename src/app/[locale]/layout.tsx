/**
 * File: src/app/[locale]/layout.tsx
 * Purpose: Root layout component with internationalization and metadata configuration
 * Author: platform.rocks
 * License: MIT
 */
import { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { ThemeProvider } from '@/components/design/theme-provider';
import { routing } from '@/i18n/routing';

import '../globals.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const { metadatas } = await getMessages();

  return {
    title: {
      default: metadatas.description,
      template: '%s | Open Source Rocks',
    },
    category: 'technology',
    description: metadatas.fullDescription,
    metadataBase: new URL('https://opensource.rocks'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en',
        es: '/es',
      },
    },
    icons: {
      icon: '/icon.png',
      shortcut: '/shortcut-icon.png',
      apple: '/apple-icon.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    },
    openGraph: {
      title: 'Open Source Rocks',
      description: metadatas.description,
      url: 'https://opensource.rocks',
      siteName: 'opensource.rocks',
      images: [
        {
          url: 'https://opensource.rocks/og.png', // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: 'https://opensource.rocks/og-alt.png', // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: 'Open Source Rocks - Alternative Image',
        },
      ],
      locale: 'pt-BR',
      type: 'website',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    keywords: metadatas.keywords,
  };
}

export const viewport: Viewport = {
  themeColor: 'black',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * Geist Sans font configuration
 */
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

/**
 * Geist Mono font configuration
 */
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

/**
 * Props for the locale layout component
 */
interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Validates if the given locale is supported
 * @param locale - The locale string to validate
 * @returns boolean indicating if locale is valid
 */
function isValidLocale(locale: string): boolean {
  return routing.locales.includes(locale as (typeof routing.locales)[number]);
}

/**
 * Locale-specific layout component
 * Provides internationalization context and font variables for the entire application
 *
 * @param children - Child components to render
 * @param params - Route parameters containing the locale
 * @returns JSX layout with i18n context
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale early
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Load messages for the current locale
  let messages;

  try {
    messages = await getMessages();
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    messages = {};
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Preconnect para melhor performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages} timeZone='America/Sao_Paulo'>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
