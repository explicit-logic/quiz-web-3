// Types
import type { ViewProps, Values } from '../IdentityForm.types';

// Modules
import { connect, type FormikContextType } from 'formik';

// Components
import LoadingIcon from '@/components/atoms/LoadingIcon';
import RightArrow from '@/components/atoms/RightArrow';

// Constants
import { STATES } from '@/constants/connection';

// Hooks
import { useConnection } from '@/hooks/useConnection';
import { useRouteLoading } from '@/hooks/useRouteLoading';

type Props = {
  fields: ViewProps['fields'],
  tCommon: (t: string) => string,
  tHome: (t: string) => string,
};

const checkDisabled = ({ dirty, fields, isValid, loading }: { dirty: boolean, fields: ViewProps['fields'], isValid: boolean, loading: boolean }) => {
  if (loading) {
    return true;
  }

  if (!fields.length) {
    return false;
  }

  return (!isValid || !dirty);
};

function SubmitButton({ fields, formik, tCommon, tHome }: Props & { formik: FormikContextType<Values> }) {
  const loading = useRouteLoading();
  const { state } = useConnection();

  const { dirty, isValid } = formik;


  return (
    <button
      type="submit"
      className={
        `${state === STATES.ONLINE ? 'bg-blue-700 dark:bg-blue-600 enabled:hover:bg-blue-800 enabled:dark:hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800' : 'bg-gray-400 enabled:hover:bg-gray-300 dark:bg-gray-700 enabled:dark:hover:bg-gray-600 focus:ring-gray-200 dark:focus:ring-gray-500'} inline-flex justify-center items-center py-3.5 px-5 text-white font-medium rounded-lg text-sm me-2 mb-2 focus:ring-4 focus:outline-none disabled:cursor-not-allowed`
      }
      disabled={checkDisabled({ dirty, fields, isValid, loading })}
    >{
        loading
          ? (<><LoadingIcon />{tCommon('loading')}</>)
          : (<>{tHome('start')}<RightArrow className="ml-2 -mr-1 w-5 h-5" /></>)
      }
    </button>
  );
}

export default connect<Props, Values>(SubmitButton);
