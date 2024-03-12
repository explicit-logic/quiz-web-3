// Modules
import { ThemeModeScript } from 'flowbite-react';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, getMessages, unstable_setRequestLocale } from 'next-intl/server';

// Lib
import { getLocales } from '@/lib/server/getLocales';

// Types
import type { Metadata } from 'next';

// Styles
// import { Inter } from 'next/font/google';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({params: { locale }}: Readonly<{
  params: { locale: string }
}>): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    generator: 'Next.js',
    applicationName: t('applicationName'),
    referrer: 'origin-when-cross-origin',
    keywords: t('keywords'),
    creator: t('creator'),
    publisher: t('publisher'),
    title: {
      default: t('title.default'),
      template: t('title.template'),
    },
    description: t('description'),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export async function generateStaticParams() {
  const locales = await getLocales();

  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeModeScript mode="auto" />
      </head>
      <body className="bg-white dark:bg-gray-900">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
