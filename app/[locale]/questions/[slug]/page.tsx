// Modules
import dynamic from 'next/dynamic';

// Lib
import { getFile, parse } from '@/lib/server/questionItem';
import { getSlugs } from '@/lib/server/questionSlugs';

// Components
const QuestionForm = dynamic(() => import('@/components/organisms/QuestionForm'), { ssr: false });

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
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <QuestionForm questions={questions} tokens={tokens} />
        </article>
      </div>
    </main>
  );
}
