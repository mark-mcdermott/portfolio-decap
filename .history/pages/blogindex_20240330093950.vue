<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts/').find())
</script>

<template>
  <p v-for="post in data.posts" :key="post.slug">
    <nuxt-link :to="`/posts/${post.slug}`">{{ post.title }}</nuxt-link>
  </p>
</template>