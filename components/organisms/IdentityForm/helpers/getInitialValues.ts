// Types
import { QuizConfig } from '@/data/quiz.types';
import { Values } from '../IdentityForm.types';

// Constants
import { FIELDS } from '../constants';

export function getInitialValues(fields: QuizConfig['fields']) {
  const initialValues: Values = {};

  if (fields.includes(FIELDS.email)) {
    initialValues[FIELDS.email] = '';
  }

  if (fields.includes(FIELDS.group)) {
    initialValues[FIELDS.group] = '';
  }

  if (fields.includes(FIELDS.name)) {
    initialValues[FIELDS.name] = '';
  }

  return initialValues;
}
