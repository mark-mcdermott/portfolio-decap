<script setup>
const { data } = await useAsyncData('home', () => queryContent('/content').findOne())
</script>

<template>
  <h1>{{ data.title }}</h1>
</template>