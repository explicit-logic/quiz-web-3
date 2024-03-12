/* eslint-disable @next/next/no-img-element */
// Modules
import { useCallback } from 'react';

// Components
import TokenImage from '../tokenComponents/TokenImage';
import MultipleResponse from '../questionComponents/MultipleResponse';
import MultipleChoice from '../questionComponents/MultipleChoice';

// Constants
import { TYPES } from '@/constants/question';

// Lib
import { process } from '@/lib/client/markdownRender';

// Types
import type { Formik } from '../QuestionForm.types';
import type { RenderHandler } from '@/lib/client/markdownRender/markdownRender.types';


export function useQuestionRender(formik: Formik, { questions, tokens }: { questions: QuestionsList; tokens: TokensList }) {
  const render: RenderHandler = useCallback(({ getId, parse }) => ({
    image: (token) => <TokenImage key={getId()} token={token} />,
    link: (token) => {
      const { href, raw, tokens } = token;
      if (raw !== 'Q') return <a key={getId()} href={href} target="_blank">{parse(tokens)}</a>;

      const question = questions.find((question) => question.id === href);
      if (!question) return null;

      if (question.type === TYPES.MC) {
        return <MultipleChoice key={question.id} formik={formik} parse={parse} question={question} />;
      }

      if (question.type === TYPES.MR) {
        return <MultipleResponse key={question.id} formik={formik} parse={parse} question={question} />;
      }
    },
  }), [formik, questions]);

  return process(tokens, render);
}
