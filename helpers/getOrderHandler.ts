import type { QuizConfig } from '@/data/quiz.types';

// Helpers
import { shuffle } from './shuffle';

export function getOrderHandler(type: QuizConfig['order']): <T>(array: T[]) => T[] {
  if (type === 'random') {
    return shuffle;
  }

  if (type === 'desc') {
    return (array) => array.sort().reverse();
  }

  return (array) => array.sort();
}
