<script setup lang="ts">
const permissions = usePermissionsStore();

const {
  data: announcements,
  refresh,
  error,
  status
} = useFetch<{ data: string[] }>('/api/announcements');

const announcementInput = useState<string>('announcementInput');
const isSubmitting = useState<boolean>('isSubmitting', () => false);

const announce = async () => {
  if (!announcementInput.value) return;
  isSubmitting.value = true;
  await $fetch('/api/announcements', {
    headers: { authorization: `Bearer ${permissions.userId}` },
    method: 'POST',
    body: { announcement: announcementInput.value }
  });
  await refresh();
  isSubmitting.value = false;
  announcementInput.value = '';
};

const deleteAnnouncement = async (announcement: string) => {
  await $fetch('/api/announcements', {
    headers: { authorization: `Bearer ${permissions.userId}` },
    method: 'DELETE',
    body: { announcement }
  });
  await refresh();
};
</script>

<template>
  <form @submit.prevent="announce" class="mb-8" v-if="permissions.isAdmin">
    <h2 class="text-xl mb-2">New Announcement</h2>
    <div class="flex items-end gap-4 max-[512px]:flex-col">
      <textarea
        type="text"
        v-model="announcementInput"
        class="border-b-2 outline-none focus:border-green-700 w-full"
        rows="4"
        placeholder="What's the latest update?"
        :readonly="isSubmitting"
      ></textarea>
      <button
        class="rounded-md bg-green-700 disabled:bg-gray-600 text-white text-lg font-medium px-3 py-1"
        :disabled="isSubmitting"
      >
        Announce
      </button>
    </div>
  </form>

  <h2 class="text-2xl mb-4">Announcements</h2>
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
  <p
    v-else-if="announcements!.length == 0"
    class="text-gray-500 text-center my-8"
  >
    No Announcements Yet!
  </p>
  <div
    v-for="announcement of announcements"
    class="text-lg p-4 rounded-md mb-8 border shadow flex items-end gap-4 max-[512px]:flex-col"
  >
    <p class="w-full">{{ announcement }}</p>
    <button @click="() => deleteAnnouncement(announcement)" v-if="permissions.isAdmin">
      <IconDelete class="text-red-300" />
    </button>
  </div>
</template>
