<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData('page-data', () => queryContent(route.path).findOne())
</script>

<template>
  <article>
    <ContentRenderer :value="data">
      <header>
        <h1>{{ data?.title }}</h1>
        <small v-if="data?.subtitle">{{ data?.subtitle }}</small>
        <small v-if="data?.date">{{ data?.date }}</small>
      </header>
      <div class="page-content">
        <ContentRendererMarkdown v-if="data" :value="data" />
      </div>
    </ContentRenderer>
  </article>
</template>