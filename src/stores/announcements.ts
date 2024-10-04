import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAnnouncementsStore = defineStore('announcements', () => {
  const announcements = ref<string[]>(
    JSON.parse(localStorage.getItem('announcements') ?? '[]')
  );

  const announce = (post: string) => {
    announcements.value.unshift(post);
    localStorage.setItem('announcements', JSON.stringify(announcements.value));
  };

  return {
    announcements,
    announce
  };
});
