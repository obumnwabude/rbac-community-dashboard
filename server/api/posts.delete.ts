import { accessSync, readFileSync, writeFileSync } from 'fs';

export default defineEventHandler(async (event) => {
  const { post } = await readBody(event);

  let posts: string[];
  try {
    accessSync('temp/posts.json');
    posts = JSON.parse(readFileSync('temp/posts.json', 'utf8'));
  } catch (e) {
    return; // No posts to delete
  }
  posts = posts.filter((p) => p !== post);

  writeFileSync('temp/posts.json', JSON.stringify(posts, null, 2));
});
