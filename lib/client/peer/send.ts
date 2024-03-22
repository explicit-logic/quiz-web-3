// Constants
import type { TYPES } from '@/constants/message';

// Store
import { getReceiver, getSenderId } from './store';

export async function send(type: keyof typeof TYPES, data: Message['data']) {
  const senderId = getSenderId();
  const receiver = getReceiver();

  if (!receiver) {
    console.error('Receiver is not set');
    return;
  }

  if (!senderId) {
    console.error('Sender id is not set');
    return;
  }

  await receiver.send({
    peerId: senderId,
    type,
    data,
  });
}
