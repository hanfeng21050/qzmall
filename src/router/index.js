import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/regist',
    name: 'Regist',
    component: () => import(/* webpackChunkName: "regist" */ '../views/regist.vue')
  },
  {
    path: '/product/detail',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "productdatail" */ '../views/product-detail.vue')
  },
  {
    path: '/shoppingcart',
    name: 'car',
    component: () => import(/* webpackChunkName: "shoppingcart" */ '../views/shopping-cart.vue')
  },
  {
    path: '/product/list',
    name: 'ProductList',
    component: () => import(/* webpackChunkName: "productlist" */ '../views/product-list.vue')
  },
  {
    path: '/orderconfirm',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "productlist" */ '../views/order-confirm.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
