import type { FormikContextType, FormikConfig } from 'formik';
import type { TokensList } from 'marked';

export type Values = Record<string, string | string[]>;

export type Formik = FormikContextType<Values>;

export type ContainerProps = {
  questions: QuestionsList;
  tokens: TokensList;
};

export type ViewProps = {
  formik: Formik;
  goBack: () => void;
  last: boolean;
  questions: QuestionsList;
  tokens: TokensList;
};

export type OnSubmit = FormikConfig<Values>['onSubmit'];
