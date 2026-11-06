export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'TTV Maastricht',
      meta: [{ name: 'description', content: 'TTV Maastricht — tafeltennis voor iedereen / table tennis for everyone' }]
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/', '/inschrijven', '/privacy', '/training', '/over-de-club', '/proefspelen', '/nieuws/open-dag-jeugd-2026',
        '/en', '/en/register', '/en/privacy', '/en/training', '/en/about', '/en/try-it', '/en/news/youth-open-day-2026'
      ]
    }
  }
})
