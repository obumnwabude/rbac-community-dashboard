<script setup lang="ts">
import { ref } from 'vue';
import { useMaterialsStore } from '../stores/materials';

const materialsStore = useMaterialsStore();
const materialInput = ref('');
const share = () => {
  if (!materialInput.value) return;
  materialsStore.addMaterial(materialInput.value);
  materialInput.value = '';
};
</script>

<template>
  <form @submit.prevent="share" class="mb-8">
    <h2 class="text-xl mb-2">New Material</h2>
    <div class="flex items-end gap-4 max-[512px]:flex-col">
      <textarea
        type="text"
        v-model="materialInput"
        class="border-b-2 outline-none focus:border-green-700 w-full"
        rows="4"
        placeholder="Share a new material ..."
      ></textarea>
      <button
        class="rounded-md bg-green-700 text-white text-lg font-medium px-3 py-1"
      >
        Share
      </button>
    </div>
  </form>

  <h2 class="text-2xl mb-4">Materials</h2>
  <p
    v-if="materialsStore.materials.length == 0"
    class="text-gray-500 text-center my-8"
  >
    No Materials Yet!
  </p>
  <div
    v-for="material of materialsStore.materials"
    class="text-lg p-4 rounded-md mb-8 border shadow"
    v-html="material"
  ></div>
</template>
