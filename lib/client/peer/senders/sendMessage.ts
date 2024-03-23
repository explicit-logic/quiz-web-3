// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { send } from '../send';

export async function sendMessage(data: Messages.Message['data']) {
  await send(TYPES.message, data);
}
