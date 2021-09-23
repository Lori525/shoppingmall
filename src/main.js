import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Http from '@/utils/http.js'

Vue.config.productionTip = false

Vue.prototype.$http = new Http()

import '@/assets/reset.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
