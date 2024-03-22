// Constants
import { TYPES } from '@/constants/message';

// Helpers
import { identifyThemeMode } from '@/helpers/identifyThemeMode';
import { send } from '../send';

export async function sendInit({ locale }: { locale: string }) {
  await send(TYPES.init, {
    agent: navigator.userAgent,
    locale,
    theme: identifyThemeMode(),
  });
}
