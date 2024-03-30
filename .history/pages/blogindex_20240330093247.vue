<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts').findOne())
</script

<template>
  <h1>{{ data.title }}</h1>
</template>