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
import type { HeadingLevels, RenderHandler } from '@/lib/client/markdownRender/markdownRender.types';


export function useQuestionRender(formik: Formik, { questions, tokens }: { questions: QuestionsList; tokens: TokensList }) {
  const render: RenderHandler = useCallback(({ getId, h, parse }) => ({
    heading: (token) => {
      const level = token.depth as HeadingLevels;

      return h(`h${level}`, parse(token.tokens), { className: 'text-3xl font-extrabold dark:text-white' });
    },
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
    paragraph: (token) => <p className="text-gray-500 dark:text-gray-400">{parse(token.tokens)}</p>,
  }), [formik, questions]);

  return process(tokens, render);
}
