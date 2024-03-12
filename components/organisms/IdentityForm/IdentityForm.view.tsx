// Types
import type { ViewProps } from './IdentityForm.types';

// Modules
import { Formik, Field, Form } from 'formik';
import { useTranslations } from 'next-intl';

// Constants
import { FIELDS } from './constants';

// Components
import Button, { VARIANTS } from '@/components/atoms/Button';
import LoadingIcon from '@/components/atoms/LoadingIcon';
import RightArrow from '@/components/atoms/RightArrow';

// Hooks
import { useLoading } from '@/hooks/useLoading';

const checkDisabled = ({ dirty, fields, isValid, loading }: { dirty: boolean, fields: ViewProps['fields'], isValid: boolean, loading: boolean }) => {
  if (loading) {
    return true;
  }

  if (!fields.length) {
    return false;
  }

  return (!isValid || !dirty);
};

function IdentityFormView(props: ViewProps) {
  const { fields, initialValues, validationSchema, onSubmit } = props;
  const t = useTranslations('Home');
  const loading = useLoading();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ dirty, isValid }) => (
        <Form className="max-w-sm mx-auto">
          {
            fields.includes(FIELDS.name) && (
              <>
                <label htmlFor={FIELDS.name} className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-gray-300">
                  {t(`fields.${FIELDS.name}.label`)}
                </label>
                <div className="flex mb-6">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg className="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                  </span>
                  <Field
                    id={FIELDS.name}
                    className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                    name={FIELDS.name}
                    placeholder={t(`fields.${FIELDS.name}.placeholder`)}
                    type="text"
                  />
                </div>
              </>
            )
          }
          {
            fields.includes(FIELDS.group) && (
              <>
                <label htmlFor={FIELDS.group} className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-gray-300">{t(`fields.${FIELDS.group}.label`)}</label>
                <div className="flex mb-6">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg className="w-6 h-6 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.8-3.1a5.5 5.5 0 0 0-2.8-6.3c.6-.4 1.3-.6 2-.6a3.5 3.5 0 0 1 .8 6.9Zm2.2 7.1h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1l-.5.8c1.9 1 3.1 3 3.1 5.2ZM4 7.5a3.5 3.5 0 0 1 5.5-2.9A5.5 5.5 0 0 0 6.7 11 3.5 3.5 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4c0 1.1.9 2 2 2h.5a6 6 0 0 1 3-5.2l-.4-.8Z" clipRule="evenodd"/>
                    </svg>
                  </span>
                  <Field
                    id={FIELDS.group}
                    className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                    name={FIELDS.group}
                    placeholder={t(`fields.${FIELDS.group}.placeholder`)}
                    type="text"
                  />
                </div>
              </>
            )
          }
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Button
              type="submit"
              disabled={checkDisabled({ dirty, fields, isValid, loading })}
              variant={VARIANTS.default}
            >{
                loading
                  ? (<><LoadingIcon />{t('loading')}</>)
                  : (<>{t('start')}<RightArrow className="ml-2 -mr-1 w-5 h-5" /></>)
              }
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default IdentityFormView;
