<script setup lang="ts">
import { ref } from 'vue';
import { useAnnouncementsStore } from '../stores/announcements';

const announcementsStore = useAnnouncementsStore();
const announcementInput = ref('');
const announce = () => {
  if (!announcementInput.value) return;
  announcementsStore.announce(announcementInput.value);
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
  <p
    v-if="announcementsStore.announcements.length == 0"
    class="text-gray-500 text-center my-8"
  >
    No Announcements Yet!
  </p>
  <div
    v-for="announcement of announcementsStore.announcements"
    class="text-lg p-4 rounded-md mb-8 border shadow"
    v-html="announcement"
  ></div>
</template>
