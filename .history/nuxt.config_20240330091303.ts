// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/scss/app.scss'],
  content: {
    sources: {
      // overwrite default source AKA `content` directory
      content: {
        driver: 'fs',
        prefix: '/docs', // All contents inside this source will be prefixed with `/docs`
        base: resolve(__dirname, 'blog')
      }
    }
  }
})