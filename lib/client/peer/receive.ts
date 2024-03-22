// Store
import { getReceiver } from './store';

export function receive(callback: (message: Message) => void) {
  const receiver = getReceiver();

  if (!receiver) {
    console.error('Receiver is not set');
    return;
  }

  receiver.on('data', (data) => {
    console.info('Receiving data ', data);
    const message = data as Message;

    callback(message);
  });
}
