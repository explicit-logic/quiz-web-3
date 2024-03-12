'use client';
// Modules
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

// Lib
import { getAllAnswers } from '@/lib/client/answerStorage';

// Constants
import { TYPES } from '@/constants/question';

function checkPassed(question: Question, answer: string | string[]): boolean {
  if (question.type === TYPES.MC) {
    let idx = 1;
    for (const item of question.items) {
      if (idx.toString() === answer && item.checked) {
        return true;
      }
      idx += 1;
    }
  }

  if (question.type === TYPES.MR) {
    let idx = 1;
    let correctCount = 0;
    let allCount = 0;
    for (const item of question.items) {
      if (item.checked) {
        allCount += 1;
        if (answer.includes(idx.toString())) {
          correctCount += 1;
        }
      }
      idx += 1;
    }

    return (allCount === correctCount);
  }

  return false;
}


function Score(props: { allQuestions: Record<string, QuestionsList> }) {
  const { allQuestions } = props;

  const { passed, total } = useMemo(() => {
    const allAnswers = getAllAnswers();

    let total = 0;
    let passedCount = 0;
    for (const [slug, questions] of Object.entries(allQuestions)) {
      for (const question of questions) {
        const answer = allAnswers[slug][question.id];
        const passed = checkPassed(question, answer);
        if (passed) {
          passedCount += 1;
        }
        total += 1;
      }
    }

    return {
      passed: passedCount,
      total,
    };
  }, [allQuestions]);


  const t = useTranslations('Result');

  return (
    <div>
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        {t('score')}
      </h2>
      <p className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        {passed}&nbsp;/&nbsp;{total}
      </p>
    </div>
  );
}

export default Score;
