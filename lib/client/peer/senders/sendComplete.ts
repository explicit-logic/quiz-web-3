// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { send } from '../send';

export async function sendComplete(data: Messages.Complete['data']) {
  await send(TYPES.complete, data);
}
