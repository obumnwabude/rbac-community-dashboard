import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMaterialsStore = defineStore('materials', () => {
  const materials = ref<string[]>(
    JSON.parse(localStorage.getItem('materials') ?? '[]')
  );

  const addMaterial = (post: string) => {
    materials.value.unshift(post);
    localStorage.setItem('materials', JSON.stringify(materials.value));
  };

  return {
    materials,
    addMaterial
  };
});
