// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { send } from '../send';

export async function sendProgress(data: Messages.Progress['data']) {
  await send(TYPES.progress, data);
}
