import { accessSync, readFileSync, writeFileSync } from 'fs';

export default defineEventHandler(async (event) => {
  const { material } = await readBody(event);

  let materials: string[];
  try {
    accessSync('temp/materials.json');
    materials = JSON.parse(readFileSync('temp/materials.json', 'utf8'));
  } catch (e) {
    return; // No materials to delete
  }
  materials = materials.filter((m) => m !== material);

  writeFileSync('temp/materials.json', JSON.stringify(materials, null, 2));
});
