'use client';
// Modules
import { useEffect } from 'react';

// Components
import DarkThemeToggle from '@/components/atoms/DarkThemeToggle';

// Lib
import { toast } from '@/lib/client/toaster';

// Store
import { getReceiver, getReceiverId, setReceiverId } from '@/store/connectionStorage';

// Hooks
import { useConnection } from '@/hooks/useConnection';
import { useSearchParams } from 'next/navigation';

function ControlBar() {
  const searchParams = useSearchParams();
  const { loading, established, setLoading, setEstablished } = useConnection();

  useEffect(() => {
    const cachedReceiver = getReceiver();
    const cachedReceiverId = getReceiverId();
    const receiverId = searchParams.get('r') ?? cachedReceiverId;

    if (cachedReceiver || !receiverId) return;
    setReceiverId(receiverId);

    const establishConnection = async () => {
      setLoading(true);

      const { connect } = await import('../../../helpers/connection');

      toast.info('Connection is established');

      try {
        const receiver = await connect({ receiverId });

        receiver.on('close', () => {
          toast.warning('Connection closed');
          setEstablished(false);
        });

        receiver.on('data', (data) => {
          console.info('Receiving data ', data, ' from ', receiverId);
        });

        await receiver.send({
          type: 'message',
          message: `Hello from student: ${new Date().getTime()}`,
        });

        setTimeout(() => {
          void receiver.send({
            type: 'message',
            message: `Hello from student again: ${new Date().getTime()}`,
          });
        }, 3000);

        setEstablished(true);
      } finally {
        setLoading(false);
      }
    };
    if (typeof navigator !== 'undefined') {
      void establishConnection();
    }
  }, [searchParams, setEstablished, setLoading]);

  return (
    <div className="inline-flex justify-between py-1 px-3 mb-7 divide-x divide-gray-400 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
      <div className="flex items-center pr-2">
        <span className="flex relative h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
        </span>
        {
          loading ? (<span>Loading...</span>) : established && (<span>Connected</span>)
        }
        {/* <span>Ariana Tyler</span> */}
      </div>
      <div className="pl-2">
        <DarkThemeToggle />
      </div>
    </div>
  );
}

export default ControlBar;
