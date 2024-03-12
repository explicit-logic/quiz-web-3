
// Constants
import { VARIANTS } from './constants';

// Types
import type { ViewProps } from './Button.types';

function ButtonView(props: ViewProps) {
  const { children, variant = VARIANTS.default, ...rest } = props;

  const variantClasses = {
    [VARIANTS.default]: 'inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 enabled:hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 disabled:cursor-not-allowed',
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
