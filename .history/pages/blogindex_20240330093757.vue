<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts/').find())
</script>

<template>
  <pre>{{ data.title }}</pre> 
</template>