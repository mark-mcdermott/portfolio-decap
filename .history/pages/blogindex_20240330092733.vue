<script setup>
const { data } = await useAsyncData('home', () => queryContent('/').findOne())
</script>

<template>
  <pre>
    {{ data }}
  </pre>
</template>