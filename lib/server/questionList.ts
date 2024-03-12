import fs from 'node:fs/promises';
import path from 'node:path';
import { Marked } from 'marked';
import matter from 'gray-matter';

import { getSlugs } from './questionSlugs';

import { extractQuestions } from './extractQuestions';

export async function getFile(locale: string, slug: string) {
  const fullPath = path.join(process.cwd(), 'data', locale, slug, `${slug}.md`);
  const str = await fs.readFile(fullPath, 'utf-8');
  const file = matter(str);

  return file;
}

export function parse(markdown: string): QuestionsList {
  const marked = new Marked();

  const tokens = marked.lexer(markdown, {
    breaks: false,
    gfm: true,
  });
  const questions = extractQuestions(tokens);

  return questions;
}

export async function getAllQuestions(locale: string): Promise<Record<string, QuestionsList>> {
  const slugs = await getSlugs(locale);

  const allQuestions: Record<string, QuestionsList> = {};

  for (const slug of slugs) {
    const file = await getFile(locale, slug);
    const { content: markdown } = file;
    const questions = parse(markdown);

    allQuestions[slug] = questions;
  }

  return allQuestions;
}
