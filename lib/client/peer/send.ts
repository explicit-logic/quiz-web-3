// Constants
import type { TYPES } from '@/constants/message';

// Store
import { getReceiver, getClientId } from './store';

export async function send(type: keyof typeof TYPES, data: Message['data']) {
  const clientId = getClientId();
  const receiver = getReceiver();

  if (!receiver) {
    console.error('Receiver is not set');
    return;
  }

  if (!clientId) {
    console.error('Client id is not set');
    return;
  }

  await receiver.send({
    clientId,
    type,
    data,
  });
}
