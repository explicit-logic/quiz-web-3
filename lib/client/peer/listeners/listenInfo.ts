// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { receive } from '../receive';

export function listenInfo(callback: (message: Messages.Info['data']) => void) {
  receive((message) => {
    if (message.type === TYPES.info) {
      const { data } = message;
      callback(data);
    }
  });
}
