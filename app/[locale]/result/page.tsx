// Modules
import dynamic from 'next/dynamic';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

// Lib
import { getAllQuestions } from '@/lib/server/questionList';

// Components
import DownloadAnswers from '@/components/molecules/DownloadAnswers';

const Score = dynamic(() => import('@/components/molecules/Score'), { ssr: false });

export default async function Page({
  params: { locale },
}: Readonly<{
  params: { locale: string }
}>) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Result');

  const allQuestions = await getAllQuestions(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {t('headline')}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{t('caption')}</p>
          <Score allQuestions={allQuestions} />
          <DownloadAnswers />
        </div>
      </section>
    </main>
  );
}
