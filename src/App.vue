<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import CommunityIcon from './icons/IconCommunity.vue';
import EcosystemIcon from './icons/IconEcosystem.vue';
import SupportIcon from './icons/IconSupport.vue';
import ToolingIcon from './icons/IconTooling.vue';
</script>

<template>
  <header class="shadow p-4 fixed top-0 left-0 right-0 z-20 h-16 bg-white">
    <h1 class="text-2xl font-bold">Community Dashboard</h1>
  </header>

  <main class="p-4 pt-20">
    <RouterView />
  </main>

  <div
    class="shadow-[rgba(0,0,0,0.1)_1px_-1px_3px_0] p-4 md:p-8 fixed bottom-0 left-0 max-md:right-0 z-10 bg-white md:top-16"
  >
    <div class="flex md:gap-4 max-md:justify-around max-md:items-center md:flex-col">
      <RouterLink to="/">
        <CommunityIcon class="hidden max-[512px]:inline-block" />
        <span class="inline-block max-[512px]:hidden">Posts</span></RouterLink
      >
      <RouterLink to="/materials"
        ><ToolingIcon class="hidden max-[512px]:inline-block" />
        <span class="inline-block max-[512px]:hidden"
          >Materials</span
        ></RouterLink
      >
      <RouterLink to="/announcements"
        ><EcosystemIcon class="hidden max-[512px]:inline-block" />
        <span class="inline-block max-[512px]:hidden"
          >Announcements</span
        ></RouterLink
      >
      <RouterLink to="/support"
        ><SupportIcon class="hidden max-[512px]:inline-block" />
        <span class="inline-block max-[512px]:hidden">Support</span></RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
a.router-link-exact-active {
  color: theme('colors.green.700');
  font-weight: bold;
}
</style>