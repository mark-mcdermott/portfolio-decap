<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts/posts').find())
</script>

<template>
  <pre>{{ data }}</pre> 
</template>