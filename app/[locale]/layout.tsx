// Modules
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

// Components
import HeadScript from '@/components/atoms/HeadScript';
import Toaster from '@/components/organisms/Toaster';

// Lib
import { getLocales } from '@/lib/server/getLocales';

// Providers
import { ConnectionProvider } from '@/providers/ConnectionProvider';

// Types
import type { Metadata } from 'next';
import Connection from '@/components/atoms/Connection';

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
    <>
      <head>
        <HeadScript locale={locale} />
      </head>
      <body className="bg-white dark:bg-gray-900">
        <Toaster />
        <Suspense><Connection /></Suspense>
        <NextIntlClientProvider messages={messages}>
          <ConnectionProvider>
            {children}
          </ConnectionProvider>
        </NextIntlClientProvider>
      </body>
    </>
  );
}
