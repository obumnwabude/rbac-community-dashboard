import { accessSync, readFileSync } from 'fs';

export default defineEventHandler(() => {
  try {
    accessSync('temp/materials.json');
    return JSON.parse(readFileSync('temp/materials.json', 'utf8'));
  } catch (e) {
    return [];
  }
});
