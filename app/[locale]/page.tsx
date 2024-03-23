// Modules
// import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

// Components
import ControlBar from '@/components/molecules/ControlBar';
import IdentityForm from '@/components/organisms/IdentityForm';
// import Link from 'next/link';

// Lib
import { getSlugs } from '@/lib/server/questionSlugs';

export default async function Home({
  params: { locale },
}: Readonly<{
  params: { locale: string }
}>) {
  unstable_setRequestLocale(locale);
  const slugs = await getSlugs(locale);
  const t = await getTranslations('Home');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <Suspense><ControlBar /></Suspense>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {t('headline')}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            {t('caption')}
          </p>
          <IdentityForm slugs={slugs}/>
        </div>
      </section>
    </main>
  );
}
