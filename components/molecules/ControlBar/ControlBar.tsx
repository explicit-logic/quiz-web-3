'use client';
// Modules
import { useEffect } from 'react';

// Components
import DarkThemeToggle from '@/components/atoms/DarkThemeToggle';

// Constants
import { STATES } from '@/constants/connection';

// Lib
import { toast } from '@/lib/client/toaster';

// Listeners
import { listenMessage } from '@/lib/client/peer/listeners/listenMessage';

// Store
import { getReceiver, getSender, getReceiverId, setReceiverId } from '@/lib/client/peer/store';

// Hooks
import { useConnection } from '@/hooks/useConnection';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Flasher from '@/components/atoms/Flasher';

let lastPathname: string;
function ControlBar({ silent = false }: Readonly<{ silent?: boolean }>) {
  const { locale } = useParams<{ locale: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const r = searchParams.get('r');
  const { state, setState } = useConnection();

  useEffect(() => {
    if (lastPathname && lastPathname === pathname) return;
    lastPathname = pathname;

    const cachedReceiver = getReceiver();
    const cachedReceiverId = getReceiverId();
    const receiverId = r ?? cachedReceiverId;

    if (cachedReceiver || !receiverId || !locale) return;
    setReceiverId(receiverId);

    const establishConnection = async () => {
      setState(STATES.LOADING);

      const { connect } = await import('../../../lib/client/peer/connect');

      try {
        const onError = (error: Error) => {
          setState(STATES.ERROR);
          toast.error(error.message);
        };

        const onClose = () => {
          setState(STATES.OFFLINE);
        };

        await connect({ locale, pathname, receiverId }, { onClose, onError });

        if (!silent) {
          toast.info('Connection is established');
        }

        listenMessage((data) => toast.message(data.text));

        setState(STATES.ONLINE);
      } catch (error) {
        setState(STATES.ERROR);
        console.error(error);
      }
    };
    if (typeof navigator !== 'undefined') {
      void establishConnection();
    }

    return () => {
      const receiver = getReceiver();
      const sender = getSender();
      if (receiver) {
        receiver.close();
      }
      if (sender) {
        sender.disconnect();
        sender.destroy();
      }
    };
  }, [locale, pathname, r, setState, silent]);

  return (
    <div className={`transition ease-in-out duration-500 ${silent ? 'opacity-40 hover:opacity-100' : ''} inline-flex justify-between h-9 py-1 pl-3 pr-2 mb-7 divide-x divide-gray-400 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white`}>
      <div className="pr-2">
        <Flasher silent={silent} state={state} />
      </div>
      <div className="pl-2">
        <DarkThemeToggle />
      </div>
    </div>
  );
}

export default ControlBar;
