// Modules
import { Suspense } from 'react';

// Lib
import { getFile, parse } from '@/lib/server/questionItem';
import { getSlugs } from '@/lib/server/questionSlugs';

// Components
import ControlBar from '@/components/molecules/ControlBar';
import QuestionForm from '@/components/organisms/QuestionForm';

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const slugs = await getSlugs(locale);
  const params = slugs.map((slug) => ({ slug }));

  return params;
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string, slug: string }
}) {
  const file: { data: Partial<{ title: string }> } = await getFile(locale, slug);
  const { data } = file;
  const { title } = data;

  if (title) {
    return {
      title,
    };
  }
}

export default async function Page({ params }: { params: { locale: string, slug: string } }) {
  const { locale, slug } = params;
  const file = await getFile(locale, slug);
  const { content: markdown } = file;
  const {
    questions,
    tokens,
  } = parse({ locale, markdown, slug });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section>
        <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-12">
          <div className="text-center">
            <Suspense><ControlBar silent /></Suspense>
          </div>
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <QuestionForm questions={questions} tokens={tokens} />
          </article>
        </div>
      </section>
    </main>
  );
}
