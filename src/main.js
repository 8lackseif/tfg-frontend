import Vue from 'vue'
import App from './App.vue'

import router from './router'

import apiServices from './common/api.service'
import VueCookie from './common/cookies'
import store from "./store"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(router);

VueCookie.init;
apiServices.init;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
