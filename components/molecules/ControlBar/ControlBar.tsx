'use client';
// Modules
import { useEffect } from 'react';

// Components
import DarkThemeToggle from '@/components/atoms/DarkThemeToggle';

// Constants
import { EVENTS } from '@/constants/connection';
import { TYPES } from '@/constants/message';

// Lib
import { eventEmitter } from '@/lib/client/eventEmitter';
import { toast } from '@/lib/client/toaster';

// Hooks
import { useConnection } from '@/hooks/useConnection';
import Flasher from '@/components/atoms/Flasher';

function ControlBar({ silent = false }: Readonly<{ silent?: boolean }>) {
  const { state } = useConnection();

  useEffect(() => {
    const onOpen = () => {
      if (!silent) {
        toast.info('Connection is established');
      }
    };

    const onMessage = (message: Message) => {
      if (message.type === TYPES.message) {
        const { data } = message;
        toast.message(data.text);
      }
    };

    const onError = (error: Error) => {
      toast.error(error.message);
    };

    const handlers = {
      [EVENTS.ERROR]: onError,
      [EVENTS.OPEN]: onOpen,
      [EVENTS.MESSAGE]: onMessage,
    };

    for (const [eventName, handler] of Object.entries(handlers)) {
      eventEmitter.on(eventName, handler);
    }

    return () => {
      for (const [eventName, handler] of Object.entries(handlers)) {
        eventEmitter.off(eventName, handler);
      }
    };
  }, [silent]);

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
