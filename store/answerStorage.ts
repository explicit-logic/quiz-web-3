import { isClient } from '@/constants/isClient';

const prefix = 're:';

type Answers = { [key: string]: string | string[] };

export function setAnswersBySlug(slug: string, answers: Answers) {
  if (!isClient) return;

  const key = `${prefix}${slug}`;
  sessionStorage.setItem(key, JSON.stringify(answers));
}

export function getAnswersBySlug(slug: string): Answers {
  if (!isClient) return {};

  const key = `${prefix}${slug}`;
  const answers = sessionStorage.getItem(key);

  if (!answers) {
    return {};
  }

  try {
    return JSON.parse(answers) as Answers;
  } catch {
    return {};
  }
}

export function getAllAnswers(): { [key: string]: Answers } {
  if (!isClient) return {};

  const keys = Object.keys(sessionStorage);
  const answers = keys.reduce<{ [key: string]: Answers }>((acc, key) => {
    if (key.startsWith(prefix)) {
      const slug = key.slice(prefix.length);
      const value = getAnswersBySlug(slug);
      acc[slug] = value;
    }

    return acc;
  }, {});

  return answers;
}
