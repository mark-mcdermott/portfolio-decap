<script setup>
const { data } = await useAsyncData('home', () => queryContent('/content/posts').findOne())
</script>

<template>
  <h1>{{ data.title }}</h1>
  <p>{{  data.content }}</p>
</template>