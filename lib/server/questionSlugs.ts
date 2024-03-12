import fs from 'node:fs/promises';
import path from 'node:path';

export async function getSlugs(locale: string) {
  const dirContent = await fs.readdir(path.join(process.cwd(), './data', locale), { withFileTypes: true });
  const directories = dirContent
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  return directories;
}
