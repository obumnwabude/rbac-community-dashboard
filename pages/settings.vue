<script setup lang="ts">
const permissions = usePermissionsStore();
</script>

<template>
  <h2 class="text-2xl mb-8">Settings</h2>

  <h3 class="text-xl mb-4">Current User</h3>
  <ul class="mb-3" v-for="[id, roles] of Object.entries(users)">
    <li>
      <label class="flex items-center gap-x-2">
        <input
          type="radio"
          :checked="permissions.userId == id"
          @change="permissions.setUser(id, roles)"
          class="w-4 h-4 checked:accent-green-700"
        />
        <p>
          <span class="font-semibold">{{ id }}:&nbsp;</span>
          <span>{{ roles }}</span>
        </p>
      </label>
    </li>
  </ul>
</template>
