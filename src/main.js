import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import httpRequest from '@/utils/httpRequest'
// import cloneDeep from 'lodash/cloneDeep'

Vue.use(ElementUI, VueAxios, axios)
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.prototype.$http = httpRequest

// 保存整站vuex本地储存初始状态

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(process.env.VUE_APP_URL)
console.log(process.env.NODE_ENV)
