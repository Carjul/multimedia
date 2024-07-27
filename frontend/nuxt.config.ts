// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: false},
  modules: [ '@pinia/nuxt','@nuxtjs/tailwindcss'],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: false,
  },
  app: {
    head: {
        title: 'App web',
        meta: [
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                charset: 'utf-8',
            },
        
          ],
          link: [
              {
                  href: 'https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css',
                  rel: 'stylesheet',
                  type: 'text/css',
              },
          ],
          script: [
              {
                  src: 'https://cdn.tailwindcss.com',
              },
          ],
        
    },
},
})