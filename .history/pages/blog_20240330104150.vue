<script setup>
const { data } = await useAsyncData('home', () => queryContent('blog/').find())
</script>

<template>
  devblog index?
  <p v-for="post in data" :key="post.id">
    <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
  </p>
</template>