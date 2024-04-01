<script setup>
useHead({
  script: [
    { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
  ],
})
const { data } = await useAsyncData('page-data', () => queryContent(`/blog`).find())
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
      <ContentRenderer v-if="data !== null" :value="data">
        <h1>{{ data[data.length - 1].title }}</h1>
        <ContentRendererMarkdown :value="data[data.length - 1]" />
    </ContentRenderer>
    </div>
  </article>
</template>