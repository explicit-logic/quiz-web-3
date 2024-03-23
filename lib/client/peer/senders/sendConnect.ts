// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { identifyThemeMode } from '@/helpers/identifyThemeMode';

// Store
import { getReceiver } from '../store';

export async function sendConnect({ clientId, locale, pathname }: { clientId?: string, locale: string, pathname: string }) {
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
      pathname,
      theme: identifyThemeMode(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  } as Messages.Connect);
}
