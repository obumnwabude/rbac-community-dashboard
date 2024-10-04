import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<string[]>(
    JSON.parse(localStorage.getItem('posts') ?? '[]')
  );

  const addPost = (post: string) => {
    posts.value.unshift(post);
    localStorage.setItem('posts', JSON.stringify(posts.value));
  };

  return {
    posts,
    addPost
  };
});
