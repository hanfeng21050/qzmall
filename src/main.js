import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import httpRequest from '@/utils/httpRequest'

Vue.use(ElementUI, VueAxios, axios)
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.prototype.$http = httpRequest

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

console.log(process.env.VUE_APP_URL)
console.log(process.env.NODE_ENV)
