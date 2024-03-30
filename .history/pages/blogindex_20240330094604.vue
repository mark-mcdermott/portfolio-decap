<script setup>
const { data } = await useAsyncData('home', () => queryContent('posts/').find())
</script>

<template>
  <p v-for="day in days" :key="day.id">
    hi
    {{ day }}
  </p>
</template>