// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { receive } from '../receive';

export function listenMessage(callback: (message: Messages.Message['data']) => void) {
  receive((message) => {
    if (message.type === TYPES.message) callback(message.data);
  });
}
