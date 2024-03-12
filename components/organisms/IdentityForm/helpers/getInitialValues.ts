// Types
import { QuizConfig } from '@/data/quiz.types';
import { Values } from '../IdentityForm.types';

// Constants
import { FIELDS } from '../constants';

export function getInitialValues(fields: QuizConfig['fields']) {
  const initialValues: Values = {};

  if (fields.includes(FIELDS.name)) {
    initialValues[FIELDS.name] = '';
  }

  if (fields.includes(FIELDS.group)) {
    initialValues[FIELDS.group] = '';
  }

  return initialValues;
}
