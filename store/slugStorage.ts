import { isClient } from '@/constants/isClient';

const key = 'slugs';

export function getSlugs(): string[] {
  if (!isClient) {
    return [];
  }
  const slugs = sessionStorage.getItem(key);

  if (!slugs) {
    return [];
  }

  try {
    return JSON.parse(slugs) as string[];
  } catch {
    return [];
  }
}

export function getNextSlug(currentSlug: string): string {
  if (!isClient) {
    return currentSlug;
  }
  const slugs = getSlugs();
  const currentIndex = slugs.indexOf(currentSlug);
  const nextIndex = currentIndex + 1;
  const nextSlug = slugs[nextIndex];

  return nextSlug;
}

export function getPreviousSlug(currentSlug: string): string {
  if (!isClient) {
    return currentSlug;
  }
  const slugs = getSlugs();
  const currentIndex = slugs.indexOf(currentSlug);
  const previousIndex = currentIndex - 1;
  const previousSlug = slugs[previousIndex];

  return previousSlug;
}

export function setSlugs(slugs: string[]) {
  if (isClient) {
    sessionStorage.setItem(key, JSON.stringify(slugs));
  }
}
