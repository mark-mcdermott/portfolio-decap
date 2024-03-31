<script setup>
const { data } = await useAsyncData('home', () => queryContent('blog/').find())

</script>

<template>
  <article lang="en">
    <header>
      <h1 title="Blog" data-title="Blog">Blog</h1>
      <small>📝 Notes from the trenches</small>
    </header>
    <div class="page-content">
      <p v-for="post in data" :key="post.id">
        <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
      </p>
    </div>
  </article>
</template>
