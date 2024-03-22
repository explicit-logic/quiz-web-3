// Constants
import { isClient } from '@/constants/isClient';

// Store
import { getThemeMode } from '@/store/themeModeStorage';

type Mode = 'dark' | 'light';

export function identifyThemeMode(): Mode {
  if (!isClient) return 'dark';
  const mode = getThemeMode() ?? 'auto';

  if (mode === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return mode;
}
