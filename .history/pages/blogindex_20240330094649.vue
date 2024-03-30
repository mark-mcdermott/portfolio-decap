<script setup>
const { posts } = await useAsyncData('home', () => queryContent('posts/').find())
</script>

<template>
  <p v-for="post in posts" :key="post.id">
    {{ post }}
  </p>
</template>