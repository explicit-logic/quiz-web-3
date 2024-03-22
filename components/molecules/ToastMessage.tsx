import { memo, type ReactNode } from 'react';
import type { Toast } from '@/lib/client/toaster/types';
import { toast } from '@/lib/client/toaster/toast';

function ToastMessage(props: { t: Toast }) {
  const { t } = props;

  return (
    <div className="w-full max-w-xs p-4 pointer-events-auto text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
      <div className="flex">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-blue-500 rounded-full dark:text-gray-200 dark:bg-blue-800">
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
          </svg>
          <span className="sr-only">Person icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Manager</span>
          <div className="mb-2 text-sm font-normal">{t.message as ReactNode}</div>
        </div>
        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target={`#t-${t.id}`}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default memo(ToastMessage);
