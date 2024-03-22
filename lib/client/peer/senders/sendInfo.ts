// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { send } from '../send';

export async function sendInfo(data: Messages.Info['data']) {
  await send(TYPES.info, data);
}
