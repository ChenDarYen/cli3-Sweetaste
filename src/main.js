import Vue from 'vue'
import Vuex from 'vuex'
import 'bootstrap'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App.vue'
import router from './router'
import store from './store/index'

import CurrencyFilter from './filters/currency'
import MomentFilter from './filters/moment'

Vue.config.productionTip = false
Axios.defaults.withCredentials = true

Vue.use(Vuex)
Vue.use(VueAxios, Axios)
Vue.use(VeeValidate, {
  events: 'input|blur'
})
Vue.component('Loading', Loading)

Vue.filter('currencyFilter', CurrencyFilter)
Vue.filter('momentFilter', MomentFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
