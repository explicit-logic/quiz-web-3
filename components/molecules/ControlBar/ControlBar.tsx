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
import { useParams, useSearchParams } from 'next/navigation';
import Flasher from '@/components/atoms/Flasher';

function ControlBar() {
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const { state, setState } = useConnection();

  useEffect(() => {
    const cachedReceiver = getReceiver();
    const cachedReceiverId = getReceiverId();
    const receiverId = searchParams.get('r') ?? cachedReceiverId;

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

        await connect({ locale, receiverId }, { onClose, onError });

        toast.info('Connection is established');

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
        sender.destroy();
      }
    };
  }, [locale, searchParams, setState]);

  return (
    <div className="inline-flex justify-between h-9 py-1 pl-3 pr-2 mb-7 divide-x divide-gray-400 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
      <div className="pr-2">
        <Flasher state={state} />
      </div>
      <div className="pl-2">
        <DarkThemeToggle />
      </div>
    </div>
  );
}

export default ControlBar;
