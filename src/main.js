import Vue from 'vue'
import App from './App.vue'

import router from './router'

import apiServices from './common/api.service'
import store from "./store"

Vue.use(router);

apiServices.init;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
