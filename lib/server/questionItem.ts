import fs from 'node:fs/promises';
import path from 'node:path';
import { Marked } from 'marked';
import matter from 'gray-matter';

import type { TokensList } from 'marked';

import { extractQuestions } from './extractQuestions';
import { walkTokens } from './walkTokens';

export async function getFile(locale: string, slug: string) {
  const fullPath = path.join(process.cwd(), 'data', locale, slug, `${slug}.md`);
  const str = await fs.readFile(fullPath, 'utf-8');
  const file = matter(str);

  return file;
}

export function parse({ locale, markdown, slug }: { locale: string, markdown: string, slug: string }): { questions: QuestionsList, tokens: TokensList } {
  const marked = new Marked();

  const tokens = marked.lexer(markdown, {
    breaks: false,
    gfm: true,
  });

  walkTokens({ locale, slug, tokens });
  const questions = extractQuestions(tokens);

  return { questions, tokens };
}
