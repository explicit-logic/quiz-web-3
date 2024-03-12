import fs from 'node:fs';
import path from 'node:path';

const dataDirectory  = './data';

const fsPromises = fs.promises;
const targetDir = './public/images';

/** @type {(images: string[], locale: string, slug: string) => Promise<void>} */
async function copyImagesToPublic(images, locale, slug) {
  for (const image of images) {
    await fsPromises.copyFile(
      path.join(process.cwd(), dataDirectory, locale, slug, image),
      path.join(process.cwd(), targetDir, locale, slug, image),
    );
  }
}

async function createPostImageFoldersForCopy() {
  if (!fs.existsSync(dataDirectory)) return;

  const dataPath = path.join(process.cwd(), dataDirectory);
  const locales = await getSubDirectoryNames(dataPath);

  for (const locale of locales) {
    const questionsPath = path.join(dataPath, locale);
    const slugs = await getSubDirectoryNames(questionsPath);

    for (const slug of slugs) {
      const allowedImageFileExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

      // Read all files inside current question folder
      const questionDirFiles = await fsPromises.readdir(path.join(questionsPath, slug));

      // Filter out files with allowed file extension (images)
      const images = questionDirFiles.filter(file =>
        allowedImageFileExtensions.includes(path.extname(file)),
      );

      if (images.length) {
        // Create a folder for images of this post inside public
        await fsPromises.mkdir(path.join(process.cwd(), targetDir, locale, slug), { recursive: true });

        await copyImagesToPublic(images, locale, slug);
      }
    }
  }
}
/** @type {(path: string) => Promise<string[]>} */
async function getSubDirectoryNames(path) {
  const dataContent = await fsPromises.readdir(path, { withFileTypes: true });
  const names = dataContent.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name).sort();

  return names;
}

if (fs.existsSync(targetDir)) {
  await fsPromises.rm(targetDir, { recursive: true });
}
await fsPromises.mkdir(targetDir);
await createPostImageFoldersForCopy();
