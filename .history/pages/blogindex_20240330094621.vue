<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts/').find())
</script>

<template>
  <p v-for="day in data" :key="day.id">
    hi
    {{ day }}
  </p>
</template>