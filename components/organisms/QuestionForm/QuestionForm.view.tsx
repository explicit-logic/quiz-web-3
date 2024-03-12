'use client';

// Modules
import { memo } from 'react';
import { useTranslations } from 'next-intl';

// Hooks
import { useLoading } from '@/hooks/useLoading';
import { useQuestionRender } from './hooks/useQuestionRender';

// Types
import type { ViewProps } from './QuestionForm.types';

// Components
import Button, { VARIANTS } from '@/components/atoms/Button';
import LoadingIcon from '@/components/atoms/LoadingIcon';
import RightArrow from '@/components/atoms/RightArrow';

const getNextButtonContent = (t: (t: string) => string, { last, loading }: { last: boolean, loading: boolean }) => {
  const buttonText = last ? t('finish') : t('next');

  if (loading) {
    return (<><LoadingIcon />{t('loading')}</>);
  }

  return (
    <>
      {buttonText}
      {!last && <RightArrow className="ml-2 -mr-1 w-5 h-5" />}
    </>
  );
};

function QuestionFormView(props: ViewProps) {
  const { formik, goBack, last, questions, tokens } = props;

  const loading = useLoading();
  const t = useTranslations('Question');

  const component = useQuestionRender(formik, { questions, tokens });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-8 lg:mb-16">{component}</div>

      {/* Action Buttons */}
      <div className="flex flex-col mb-8 lg:mb-16 justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Button
          type="button"
          variant={VARIANTS.alternative}
          onClick={goBack}
        >
          {t('back')}
        </Button>
        <Button
          type="submit"
          disabled={(loading || !formik.isValid || !formik.dirty)}
          variant={VARIANTS.default}
        >
          {getNextButtonContent(t, { last, loading })}
        </Button>
      </div>
    </form>
  );
}

export default memo(QuestionFormView);
