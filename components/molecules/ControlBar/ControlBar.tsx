'use client';
// Modules
import { useEffect, useState } from 'react';

// Components
import DarkThemeToggle from '@/components/atoms/DarkThemeToggle';

// Helpers
// import { PeerConnection } from '@/helpers/peer';

// Hooks
import { useSearchParams } from 'next/navigation';

function ControlBar() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const receiverId = searchParams.get('r');
    console.log(receiverId);

    if (!receiverId) return;

    const connect = async () => {
      setLoading(true);

      const { PeerConnection } = await import('../../../helpers/peer');

      // Sender
      await PeerConnection.startPeerSession();

      // Receiver
      await PeerConnection.connectPeer(receiverId);

      PeerConnection.onConnectionDisconnected(receiverId, () => {
        console.info('Connection closed: ' + receiverId);
      });
      PeerConnection.onConnectionReceiveData(receiverId, (data) => {
        console.info('Receiving data ', data, ' from ' + receiverId);
      });

      await PeerConnection.sendConnection(receiverId, {
        type: 'message',
        message: 'Hello from student: ' + new Date().getTime(),
      });

      setTimeout(() => {
        void PeerConnection.sendConnection(receiverId, {
          type: 'message',
          message: 'Hello from student again: ' + new Date().getTime(),
        });
      }, 3000);

      setLoading(false);
    };
    if (typeof navigator !== 'undefined') {
      void connect();
    }
  }, [searchParams]);

  return (
    <div className="inline-flex justify-between py-1 px-3 mb-7 divide-x divide-gray-400 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
      <div className="flex items-center pr-2">
        <span className="flex relative h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
        </span>
        {
          loading ? (<span>Loading...</span>) : (<span>Connected</span>)
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
