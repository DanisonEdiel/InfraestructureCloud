import { createApp } from 'vue'
import App from './App.vue'
import '@/scss/style.scss'
import { vuetify } from './plugins/vuetify'
import router from './router'
import { VueQueryPlugin, QueryClient, type VueQueryPluginOptions } from '@tanstack/vue-query'

const queryClient = new QueryClient()
const vueQueryOptions: VueQueryPluginOptions = { queryClient }

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueQueryPlugin, vueQueryOptions)
  .mount('#app')