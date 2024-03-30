<script setup>
const { data } = await useAsyncData('home', () => queryContent('blog/').find())
</script>

<template>
  <h1>Blog Index</h1>
  <p v-for="post in data" :key="post.id">
    <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
  </p>
</template>