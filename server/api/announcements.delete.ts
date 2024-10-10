import { accessSync, readFileSync, writeFileSync } from 'fs';

export default defineEventHandler(async (event) => {
  const { announcement } = await readBody(event);

  let announcements: string[];
  try {
    accessSync('temp/announcements.json');
    announcements = JSON.parse(readFileSync('temp/announcements.json', 'utf8'));
  } catch (_) {
    return; // No announcements to delete
  }
  announcements = announcements.filter((a) => a !== announcement);

  writeFileSync(
    'temp/announcements.json',
    JSON.stringify(announcements, null, 2)
  );
});
