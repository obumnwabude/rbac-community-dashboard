<script setup lang="ts">
const {
  data: materials,
  refresh,
  error,
  status
} = useFetch<{ data: string[] }>('/api/materials');

const materialInput = useState<string>('materialInput');

const shareMaterial = async () => {
  if (!materialInput.value) return;
  await $fetch('/api/materials', {
    method: 'POST',
    body: { material: materialInput.value }
  });
  await refresh();
  materialInput.value = '';
};
</script>

<template>
  <form @submit.prevent="shareMaterial" class="mb-8">
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
  <p v-if="status.includes('pending')" class="text-gray-500 text-center my-8">
    Loading...
  </p>
  <p
    v-else-if="status.includes('idle') || status.includes('error') || error"
    class="text-gray-500 text-center my-8"
  >
    Something went wrong.
    <br />
    <br />
    {{ error }}
    <br />
    <br />
    <button
      class="rounded-md border border-green-700 text-green-700 text-lg font-medium px-3 py-1"
      @click="() => refresh()"
    >
      Retry
    </button>
  </p>
  <p v-else-if="materials!.length == 0" class="text-gray-500 text-center my-8">
    No Materials Yet!
  </p>
  <div
    v-for="material of materials"
    class="text-lg p-4 rounded-md mb-8 border shadow"
    v-html="material"
  ></div>
</template>
