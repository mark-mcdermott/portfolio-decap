<script setup>
const { data } = await useAsyncData('home', () => queryContent('blog/').find())
</script>

<template>
  <article lang="en">
    <div class="post-list">
      <p v-for="post in data.sort((a, b) => new Date(b.date) - new Date(a.date))" :key="post._id">
        <NuxtLink :to="post._path">
          <small>{{ new Date(post.date).toLocaleDateString() }}</small> 
          {{ post.title }}
        </NuxtLink>
      </p>
    </div>
  </article>
</template>


