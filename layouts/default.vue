<template>
  <header
    class="shadow p-4 sm:px-8 fixed top-0 left-0 right-0 z-20 h-16 bg-white"
  >
    <h1 class="text-2xl font-bold">Community Dashboard</h1>
  </header>

  <main class="p-6 pt-24 md:ml-48 max-md:pb-20">
    <div class="max-w-lg max-md:mx-auto">
      <slot />
    </div>
  </main>

  <div
    class="shadow-[rgba(0,0,0,0.1)_1px_-1px_3px_0] p-4 md:p-8 fixed bottom-0 left-0 max-md:right-0 z-10 max-md:h-16 bg-white md:top-16 md:w-44"
  >
    <div
      class="flex md:gap-4 max-md:justify-around max-md:items-center md:flex-col"
    >
      <NuxtLink to="/">
        <IconCommunity class="hidden max-[512px]:inline-block" />
        <span class="inline-block max-[512px]:hidden">Posts</span>
      </NuxtLink>
      <NuxtLink to="/materials"
        ><IconTooling class="hidden max-[512px]:inline-block" />
        <span class="inline-block max-[512px]:hidden">Materials</span>
      </NuxtLink>
      <NuxtLink to="/announcements">
        <IconEcosystem class="hidden max-[512px]:inline-block" />
        <span class="inline-block max-[512px]:hidden">Announcements</span>
      </NuxtLink>
      <NuxtLink to="/settings">
        <IconSettings class="hidden max-[512px]:inline-block" />
        <span class="inline-block max-[512px]:hidden">Settings</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
a.router-link-exact-active {
  color: theme('colors.green.700');
  font-weight: bold;
}
</style>
