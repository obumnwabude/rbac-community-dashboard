<script setup lang="ts">
const permissions = usePermissionsStore();

const {
  data: materials,
  refresh,
  error,
  status
} = useFetch<{ data: string[] }>('/api/materials');

const materialInput = useState<string>('materialInput');
const isSubmitting = useState<boolean>('isSubmitting', () => false);

const shareMaterial = async () => {
  if (!materialInput.value) return;
  isSubmitting.value = true;
  await $fetch('/api/materials', {
    headers: { authorization: `Bearer ${permissions.userId}` },
    method: 'POST',
    body: { material: materialInput.value }
  });
  await refresh();
  isSubmitting.value = false;
  materialInput.value = '';
};

const deleteMaterial = async (material: string) => {
  await $fetch('/api/materials', {
    headers: { authorization: `Bearer ${permissions.userId}` },
    method: 'DELETE',
    body: { material }
  });
  await refresh();
};
</script>

<template>
  <form
    @submit.prevent="shareMaterial"
    class="mb-8"
    v-if="permissions.isMentor"
  >
    <h2 class="text-xl mb-2">New Material</h2>
    <div class="flex items-end gap-4 max-[512px]:flex-col">
      <textarea
        type="text"
        v-model="materialInput"
        class="border-b-2 outline-none focus:border-green-700 w-full"
        rows="4"
        placeholder="Share a new material ..."
        :readonly="isSubmitting"
      ></textarea>
      <button
        class="rounded-md bg-green-700 disabled:bg-gray-600 text-white text-lg font-medium px-3 py-1"
        :disabled="isSubmitting"
      >
        Share
      </button>
    </div>
  </form>

  <h2 class="text-2xl mb-4">Materials</h2>
  <p v-if="status.includes('pending')" class="text-gray-500 text-center my-8">
    Loading...
  </p>
  <p v-else-if="error" class="text-gray-500 text-center my-8">
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
    class="text-lg p-4 rounded-md mb-8 border shadow flex items-end gap-4 max-[512px]:flex-col"
  >
    <p class="w-full">{{ material }}</p>
    <button @click="() => deleteMaterial(material)" v-if="permissions.isMentor">
      <IconDelete class="text-red-300" />
    </button>
  </div>
</template>
