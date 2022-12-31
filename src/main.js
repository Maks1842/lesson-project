import Vue from 'vue'
import App from './App.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'

import  './assets/static/css/style.css'

Vue.config.productionTip = false

Vue.prototype.axios = axios
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  vuetify,
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
