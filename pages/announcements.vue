<script setup lang="ts">
const {
  data: announcements,
  refresh,
  error,
  status
} = useFetch<{ data: string[] }>('/api/announcements');

const announcementInput = useState<string>('announcementInput');

const announce = async () => {
  if (!announcementInput.value) return;
  await $fetch('/api/announcements', {
    method: 'POST',
    body: { announcement: announcementInput.value }
  });
  await refresh();
  announcementInput.value = '';
};
</script>

<template>
  <form @submit.prevent="announce" class="mb-8">
    <h2 class="text-xl mb-2">New Announcement</h2>
    <div class="flex items-end gap-4 max-[512px]:flex-col">
      <textarea
        type="text"
        v-model="announcementInput"
        class="border-b-2 outline-none focus:border-green-700 w-full"
        rows="4"
        placeholder="What's the latest update?"
      ></textarea>
      <button
        class="rounded-md bg-green-700 text-white text-lg font-medium px-3 py-1"
      >
        Announce
      </button>
    </div>
  </form>

  <h2 class="text-2xl mb-4">Announcements</h2>
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
  <p
    v-else-if="announcements!.length == 0"
    class="text-gray-500 text-center my-8"
  >
    No Announcements Yet!
  </p>
  <div
    v-for="announcement of announcements"
    class="text-lg p-4 rounded-md mb-8 border shadow"
    v-html="announcement"
  ></div>
</template>
