import { accessSync, readFileSync } from 'fs';

export default defineEventHandler(() => {
  try {
    accessSync('temp/announcements.json');
    return JSON.parse(readFileSync('temp/announcements.json', 'utf8'));
  } catch (e) {
    return [];
  }
});
