<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts/').find())
</script>

<template>
  hi
  <p v-for="post in data.posts" :key="post.slug">
    hi
  </p>
</template>