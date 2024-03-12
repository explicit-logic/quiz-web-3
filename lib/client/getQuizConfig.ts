// Types
import type { QuizConfig } from '@/data/quiz.types';

import config from '@/data/quiz.json';

export function getQuizConfig() {
  return config as QuizConfig;
}
