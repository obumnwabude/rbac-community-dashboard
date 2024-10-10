<script setup lang="ts">
const permissions = usePermissionsStore();

const {
  data: posts,
  refresh,
  error,
  status
} = useFetch<{ data: string[] }>('/api/posts');

const postInput = useState<string>('postInput');
const isSubmitting = useState<boolean>('isSubmitting', () => false);

const makePost = async () => {
  if (!postInput.value) return;
  isSubmitting.value = true;
  await $fetch('/api/posts', {
    headers: { authorization: `Bearer ${permissions.userId}` },
    method: 'POST',
    body: { post: postInput.value }
  });
  await refresh();
  isSubmitting.value = false;
  postInput.value = '';
};
</script>

<template>
  <form @submit.prevent="makePost" class="mb-8" v-if="permissions.isMember">
    <h2 class="text-xl mb-2">New Post</h2>
    <div class="flex items-end gap-4 max-[512px]:flex-col">
      <textarea
        type="text"
        v-model="postInput"
        class="border-b-2 outline-none focus:border-green-700 w-full"
        rows="4"
        placeholder="What's on your mind?"
        :readonly="isSubmitting"
      ></textarea>
      <button
        class="rounded-md bg-green-700 disabled:bg-gray-600 text-white text-lg font-medium px-3 py-1"
        :disabled="isSubmitting"
      >
        Post
      </button>
    </div>
  </form>

  <h2 class="text-2xl mb-4">Posts</h2>
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
  <p v-else-if="posts!.length == 0" class="text-gray-500 text-center my-8">
    No Posts Yet!
  </p>
  <div v-for="post of posts" class="text-lg p-4 rounded-md mb-8 border shadow">
    {{ post }}
  </div>
</template>
