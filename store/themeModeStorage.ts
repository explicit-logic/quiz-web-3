import { isClient } from '@/constants/isClient';

export const key = 'theme-mode';

type Mode = 'dark' | 'light';

export function getThemeMode(): Mode | null {
  if (!isClient) {
    return null;
  }
  const themeMode = <Mode>sessionStorage.getItem(key);

  return themeMode;
}

export function setThemeMode(mode: Mode) {
  if (isClient) {
    sessionStorage.setItem(key, mode);
  }
}
