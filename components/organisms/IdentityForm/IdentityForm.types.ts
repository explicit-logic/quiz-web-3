import type { QuizConfig } from '@/data/quiz.types';
import type { FormikConfig } from 'formik';
import type { ObjectSchema } from 'yup';

export type Values = {
  email?: string;
  group?: string;
  name?: string;
};

export type ContainerProps = {
  slugs: string[];
};

export type ViewProps = {
  fields: QuizConfig['fields'];
  initialValues: Values;
  validationSchema: ObjectSchema<{ [x: string]: unknown; }>;
  onSubmit: FormikConfig<Values>['onSubmit'];
};

export type OnSubmit = FormikConfig<Values>['onSubmit'];
