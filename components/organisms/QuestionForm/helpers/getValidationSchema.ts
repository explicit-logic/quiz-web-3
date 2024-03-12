// Modules
import * as yup from 'yup';

export function getValidationSchema(questions: QuestionsList) {
  const schema: yup.ObjectShape = {};

  for (const question of questions) {
    schema[question.id] = yup.mixed().required();
  }

  return yup.object().shape(schema);
}
