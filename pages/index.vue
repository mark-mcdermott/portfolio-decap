<script setup>
const { data } = await useAsyncData('home', () => queryContent('/blog').find())
</script>

<template>
  <article>
    <header>
        <h1 class="image-title"> Mark McDermott <img src="~/assets/img/logo-and-name-clean.svg"> </h1>
        <h2 class="sub-title">Software Developer in Austin, Texas</h2>
        <small><b><a href="https://github.com/mark-mcdermott">GitHub</a></b>・<a href="https://www.linkedin.com/pub/mark-mcdermott/16/749/6a1/">Linkedin</a></small> 
    </header>
    <div class="page-content">
      <h2>Latest Post</h2>
      <pre>{{ data }}</pre>
      <p v-for="post in data" :key="post.id">
        <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
      </p>
    </div>
  </article>
</template>