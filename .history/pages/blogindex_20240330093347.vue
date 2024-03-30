<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts').findOne())
</script>

<template>
  <pre>{{ data }}</pre>
</template>