<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts/').find())
</script>

<template>
  <span v-for="day in days" :key="day.id">
    {{ day }}
  </span>
</template>