import fs from 'node:fs';
import path from 'path';

/** @type {() => import('../../data/quiz.types').QuizConfig} */
export function getQuizConfig() {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), 'data/quiz.json');
  // Read the json file
  const jsonData = fs.readFileSync(filePath);

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(jsonData);
  } catch {
    return {};
  }
}
