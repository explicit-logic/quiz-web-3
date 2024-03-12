'use client';
// Modules
import { useEffect } from 'react';

// Lib
import { setIdentity } from '@/lib/client/identityStorage';
import { setSlugs } from '@/lib/client/slugStorage';

// Config
import { getQuizConfig } from '@/lib/client/getQuizConfig';

// Components
import IdentityFormView from './IdentityForm.view';

// Constants
// import { FIELDS } from './constants';

// Helpers
import { getOrderHandler } from '@/helpers/getOrderHandler';
import { getInitialValues } from './helpers/getInitialValues';
import { getValidationSchema } from './helpers/getValidationSchema';

// Hooks
import { useParams, useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';

// Types
import type { ContainerProps, Values } from './IdentityForm.types';

const config = getQuizConfig();
const orderHandler = getOrderHandler(config.order);

function IdentityFormContainer(props: ContainerProps) {
  const { slugs } = props;

  const { locale } = useParams<{ locale: string }>();

  const initialValues = getInitialValues(config.fields);
  const validationSchema = getValidationSchema(config.fields);

  const router = useRouter();
  // const searchParams = useSearchParams();

  useEffect(() => {
    const finished = sessionStorage.getItem('finished');

    if (finished) {
      router.replace(`/${locale}/result`);
    }
  }, [locale, router]);

  function onSubmit(values: Values) {
    if (!slugs.length) return;

    setIdentity(values);

    // const room = searchParams.get('r');
    const orderedSlugs = orderHandler(slugs);
    setSlugs(orderedSlugs);
    const [slug] = orderedSlugs;

    router.replace(`/${locale}/questions/${slug}`);
  }

  return (
    <IdentityFormView
      initialValues={initialValues}
      fields={config.fields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
}

export default IdentityFormContainer;
