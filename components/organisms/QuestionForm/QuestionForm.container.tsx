'use client';

import { useFormik } from 'formik';

// Lib
import { setAnswersBySlug } from '@/lib/client/answerStorage';
import { getNextSlug, getPreviousSlug } from '@/lib/client/slugStorage';

// Components
import QuestionFormView from './QuestionForm.view';

// Helpers
import { getValidationSchema } from './helpers/getValidationSchema';

// Hooks
import { useRouter, useParams } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';

// Types
import type { ContainerProps, Values } from './QuestionForm.types';

function QuestionFormContainer(props: ContainerProps) {
  const { questions, tokens } = props;

  const { locale, slug } = useParams<{ locale: string, slug: string }>();

  const router = useRouter();

  const validationSchema = getValidationSchema(questions);

  const nextSlug = getNextSlug(slug);
  const last = Boolean(!nextSlug);

  const formik = useFormik({
    initialValues: {},
    onSubmit,
    validationSchema,
  });

  function goBack() {
    const previousSlug = getPreviousSlug(slug);

    if (!previousSlug) return;

    router.replace(`/${locale}/questions/${previousSlug}`);
  }

  function onSubmit(values: Values) {
    // const room = searchParams.get('r');

    setAnswersBySlug(slug, values);

    if (last) {
      sessionStorage.setItem('finished', 'true');
      router.replace(`/${locale}/result`);
    } else {
      router.replace(`/${locale}/questions/${nextSlug}`);
    }
  }

  return (
    <QuestionFormView formik={formik} goBack={goBack} questions={questions} last={last} tokens={tokens} />
  );
}

export default QuestionFormContainer;
