<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData('page-data', () => queryContent(route.path).findOne())
</script>

<template>
  <article>
    <ContentRenderer :value="data">
      <header>
        <h1 v-if="data?.showHomePageImage" class="homepage-image"> 
          <img src="~/assets/img/logo-and-name-clean.svg"> 
        </h1>
        <h1 v-else>{{ data?.title }}</h1>
        <h2 v-if="data?.subtitleH2">{{ data?.subtitleH2 }}</h2>
        <small v-if="data?.subtitle">{{ data?.subtitle }}</small>
        <small v-if="data?.date">{{ data?.date }}</small>
        <small v-if="data?.showSocials"><b><a href="https://github.com/mark-mcdermott">GitHub</a></b>・<a href="https://www.linkedin.com/pub/mark-mcdermott/16/749/6a1/">Linkedin</a></small>
      </header>
      <div class="page-content">
        <ContentRendererMarkdown v-if="data" :value="data" />
      </div>
    </ContentRenderer>
  </article>
</template>
