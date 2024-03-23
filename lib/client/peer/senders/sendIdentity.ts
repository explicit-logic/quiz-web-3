// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { send } from '../send';

export async function sendIdentity(data: Messages.Identity['data']) {
  await send(TYPES.identity, data);
}
