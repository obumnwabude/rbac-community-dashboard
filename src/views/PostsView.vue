<script setup lang="ts">
import { ref } from 'vue';
import { usePostsStore } from '../stores/posts';

const postsStore = usePostsStore();
const postInput = ref('');
const makePost = () => {
  if (!postInput.value) return;
  postsStore.addPost(postInput.value);
  postInput.value = '';
};
</script>

<template>
  <form @submit.prevent="makePost" class="mb-8">
    <h2 class="text-xl mb-2">New Post</h2>
    <div class="flex items-end gap-4 max-[512px]:flex-col">
      <textarea
        type="text"
        v-model="postInput"
        class="border-b-2 outline-none focus:border-green-700 w-full"
        rows="4"
        placeholder="What's on your mind?"
      ></textarea>
      <button
        class="rounded-md bg-green-700 text-white text-lg font-medium px-3 py-1"
      >
        Post
      </button>
    </div>
  </form>

  <h2 class="text-2xl mb-4">Posts</h2>
  <p v-if="postsStore.posts.length == 0" class="text-gray-500 text-center my-8">
    No Posts Yet!
  </p>
  <div
    v-for="post of postsStore.posts"
    class="text-lg p-4 rounded-md mb-8 border shadow"
  >
    {{ post }}
  </div>
</template>
