<script setup>
const { data } = await useAsyncData('home', () => queryContent(`/blog`).find())
</script>

<template>
  <ContentRenderer v-if="data !== null" :value="data">
    <h1>{{ data[data.length - 1].title }}</h1>
    <ContentRendererMarkdown :value="data[data.length - 1]" />
  </ContentRenderer>
</template>