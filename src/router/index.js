import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import { clearLoginInfo } from '@/utils/utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/index.vue'),
    meta: {
      isLogin: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    meta: {
      isLogin: false
    }
  },
  {
    path: '/regist',
    name: 'Regist',
    component: () => import(/* webpackChunkName: "regist" */ '../views/regist.vue'),
    meta: {
      isLogin: false
    }
  },
  {
    path: '/product/detail',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "productdatail" */ '../views/product-detail.vue'),
    meta: {
      isLogin: false
    }
  },
  {
    path: '/shoppingcart',
    name: 'ShoppingCart',
    component: () => import(/* webpackChunkName: "shoppingcart" */ '../views/shopping-cart.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/product/list',
    name: 'ProductList',
    component: () => import(/* webpackChunkName: "productlist" */ '../views/product-list.vue'),
    meta: {
      isLogin: false
    }
  },
  {
    path: '/orderconfirm',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "productlist" */ '../views/order-confirm.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/orderpay',
    name: 'OrderPay',
    component: () => import(/* webpackChunkName: "productlist" */ '../views/order-pay.vue'),
    meta: {
      isLogin: true
    }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

/* 全局路由守卫 */
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) { // 判断页面是否需要登录才可操作
    if (!Vue.cookie.get('token')) { // 判断用户是否登录，值为true，代表登录了
      ElementUI.Message({
        title: '提示',
        message: '请先登录',
        type: 'error'
      })
      clearLoginInfo()
      next('/login')
    }
  }
  next()
})

export default router
