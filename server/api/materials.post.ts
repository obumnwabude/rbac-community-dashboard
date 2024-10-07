import { accessSync, readFileSync, writeFileSync } from 'fs';

export default defineEventHandler(async (event) => {
  const { material } = await readBody(event);

  let materials: string[];
  try {
    accessSync('temp/materials.json');
    materials = JSON.parse(readFileSync('temp/materials.json', 'utf8'));
  } catch (e) {
    materials = [];
  }
  materials.unshift(material);

  writeFileSync('temp/materials.json', JSON.stringify(materials, null, 2));
});
