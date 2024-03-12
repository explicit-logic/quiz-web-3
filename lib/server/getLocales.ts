import fs from 'node:fs/promises';
import path from 'node:path';

export async function getLocales(): Promise<string[]> {
  const dirContent = await fs.readdir(path.join(process.cwd(), './messages'), { withFileTypes: true });
  const locales = dirContent
    .filter((dirent) => (dirent.isFile() && path.extname(dirent.name) === '.json'))
    .map(dirent => path.parse(dirent.name).name)
    .sort();

  return locales;
}
