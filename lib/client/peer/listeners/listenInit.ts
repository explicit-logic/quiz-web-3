// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { receive } from '../receive';

export function listenInit(callback: (message: Messages.Init['data']) => void) {
  receive((message) => {
    if (message.type === TYPES.init) callback(message.data);
  });
}
