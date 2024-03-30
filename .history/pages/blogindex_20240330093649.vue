<script setup>
const { data } = await useAsyncData('home', () => queryContent('/').find())
</script>

<template>
  <pre>{{ data }}</pre> 
</template>