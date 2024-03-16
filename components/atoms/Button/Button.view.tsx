
// Constants
import { VARIANTS } from './constants';

// Types
import type { ViewProps } from './Button.types';

function ButtonView(props: ViewProps) {
  const { children, variant = VARIANTS.default, ...rest } = props;

  const variantClasses = {
    [VARIANTS.default]: 'inline-flex justify-center items-center py-3.5 px-5 text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-blue-600 enabled:dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:cursor-not-allowed',
    [VARIANTS.alternative]: 'py-3 px-5 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
  };

  const className = variantClasses[variant] ?? variantClasses[VARIANTS.default];

  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}

export default ButtonView;
