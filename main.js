import App from './App'
import { createPinia } from 'pinia'
import lazyPlugin from 'vue3-lazy'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.use(lazyPlugin, {
    loading: '@/static/images/cover_loading.png',
  })
  return {
    app
  }
}
// #endif