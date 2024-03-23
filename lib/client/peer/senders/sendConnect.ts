// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { identifyThemeMode } from '@/helpers/identifyThemeMode';

// Store
import { getReceiver } from '../store';

export async function sendConnect({ clientId, locale }: { clientId?: string, locale: string }) {
  const receiver = getReceiver();

  if (!receiver) {
    console.error('Receiver is not set');
    return;
  }

  await receiver.send({
    type: TYPES.connect,
    data: {
      agent: navigator.userAgent,
      clientId,
      locale,
      theme: identifyThemeMode(),
    },
  } as Messages.Connect);
}
