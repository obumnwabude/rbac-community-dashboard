import { accessSync, readFileSync } from 'fs';

export default defineEventHandler(() => {
  try {
    accessSync('temp/posts.json');
    return JSON.parse(readFileSync('temp/posts.json', 'utf8'));
  } catch (e) {
    return [];
  }
});
