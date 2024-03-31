<script setup lang="ts">
const route = useRoute()
const splitRoute = route.path.split('/')
const slug = splitRoute[splitRoute.length - 1]
const { data } = await useAsyncData('page-data', () => queryContent(`/blog/${slug}`).findOne())
</script>

<template>
  <article>
    <ContentRenderer :value="data">
      <header>
        <h1>{{ data?.title }}</h1>
      </header>
      <div class="page-content">
        <ContentRendererMarkdown v-if="data" :value="data" />
      </div>
    </ContentRenderer>
  </article>
</template>