import { accessSync, readFileSync, writeFileSync } from 'fs';
import { Permit } from 'permitio';

export default defineEventHandler(async (event) => {
  const { announcement } = await readBody(event);

  let announcements: string[];
  try {
    accessSync('temp/announcements.json');
    announcements = JSON.parse(readFileSync('temp/announcements.json', 'utf8'));
  } catch (_) {
    announcements = [];
  }
  announcements.unshift(announcement);

  writeFileSync(
    'temp/announcements.json',
    JSON.stringify(announcements, null, 2)
  );
});
