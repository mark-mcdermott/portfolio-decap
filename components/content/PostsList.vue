<script setup>
const { data } = await useAsyncData('home', () => queryContent('blog/').find())
</script>

<template>
  <article lang="en">
    <div class="page-content">
      <p v-for="post in data" :key="post.id">
        <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
      </p>
    </div>
  </article>
</template>


