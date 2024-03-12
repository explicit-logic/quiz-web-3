// Types
import { QuizConfig } from '@/data/quiz.types';

// Modules
import * as yup from 'yup';

// Constants
import { FIELDS } from '../constants';

export function getValidationSchema(fields: QuizConfig['fields']) {
  const schema: yup.ObjectShape = {};

  if (fields.includes(FIELDS.name)) {
    schema[FIELDS.name] = yup.string().min(2).max(255).required();
  }

  if (fields.includes(FIELDS.group)) {
    schema[FIELDS.group] = yup.string().min(2).max(255).required();
  }

  return yup.object().shape(schema);
}
