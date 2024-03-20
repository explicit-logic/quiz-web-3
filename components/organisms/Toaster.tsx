'use client';
import type { ReactElement } from 'react';
import type { Toast, ToastType } from '@/lib/client/toaster/types';
import { memo } from 'react';
import { useToaster } from '@/lib/client/toaster/use-toaster';

// Components
import ToastBlank from '@/components/molecules/ToastBlank';
import ToastError from '@/components/molecules/ToastError';
import ToastInfo from '@/components/molecules/ToastInfo';
import ToastMessage from '../molecules/ToastMessage';
import ToastSuccess from '@/components/molecules/ToastSuccess';
import ToastWarning from '@/components/molecules/ToastWarning';

import ToastWrapper from '@/components/molecules/ToastWrapper';

const toastComponents: ({ blank: (t: Toast) => ReactElement } & { [key in ToastType]?: (t: Toast) => ReactElement }) = {
  blank: (t) => <ToastBlank t={t} />,
  error: (t) => <ToastError t={t} />,
  info: (t) => <ToastInfo t={t} />,
  message: (t) => <ToastMessage t={t} />,
  success: (t) => <ToastSuccess t={t} />,
  warning: (t) => <ToastWarning t={t} />,
};

const getToastComponent = (t: Toast) => {
  const componentFn = toastComponents[t.type];
  if (componentFn) {
    return componentFn(t);
  }

  return toastComponents.blank(t);
};

function Toaster() {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: 16,
        left: 16,
        right: 16,
        bottom: 16,
        pointerEvents: 'none',
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((t) => <ToastWrapper key={t.id} t={t} handlers={handlers}>{getToastComponent(t)}</ToastWrapper>)}
    </div>
  );
}

export default memo(Toaster);
