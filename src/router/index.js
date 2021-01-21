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
    path: '/shopping/cart',
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
    path: '/order/confirm',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "orderconfirm" */ '../views/order-confirm.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/order/pay',
    name: 'OrderPay',
    component: () => import(/* webpackChunkName: "orderpay" */ '../views/order-pay.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/index.vue'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "" */ '../views/user/order.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "order" */ '../views/user/order.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'order/detail',
        name: 'OrderDetail',
        component: () => import(/* webpackChunkName: "orderDetail" */ '../views/user/order-detail.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'collection',
        name: 'Collection',
        component: () => import(/* webpackChunkName: "collection" */ '../views/user/collection.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'address',
        name: 'Address',
        component: () => import(/* webpackChunkName: "address" */ '../views/user/address.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'information',
        name: 'Information',
        component: () => import(/* webpackChunkName: "information" */ '../views/user/information.vue'),
        meta: {
          isLogin: true
        }
      }
    ]
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
      ElementUI.Notification({
        title: '提示',
        message: '请先登录',
        type: 'error',
        duration: 1500
      })
      clearLoginInfo()
      next('/login')
    }
  }
  next()
})

export default router
