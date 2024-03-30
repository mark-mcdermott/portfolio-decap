<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts').findOne())
</script>

<template>
  <h1>{{ data }}</h1>
</template>