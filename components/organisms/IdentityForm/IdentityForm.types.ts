import type { FormikConfig } from 'formik';
import type { ObjectSchema } from 'yup';
import type { QuizConfig } from '@/data/quiz.types';

export type Values = {
  name?: string;
  group?: string;
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
