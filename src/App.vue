<template>
  <div class="body">
    <div class="header">
      <div class="inter">
        <router-link to="/" class="logo"><img src="./style/images/logo.png" alt=""></router-link>
        <router-link to="/" class="inter-i">首页</router-link>
        <router-link :to="{name:'ProductList', query:{t:new Date().getTime()}}" class="inter-i">查看所有商品</router-link>
        <el-input clearable @keydown.native="doSearch" v-model="searchText" placeholder="请输入内容" size="small " prefix-icon="iconfont icon-search" style="display:inline-block; width:300px;line-height:68px;">
        </el-input>
        <el-button plain size="small" type="warning" style="margin-left:5px" @click="search">搜索</el-button>

        <div class="inter_right">
          <div v-if="login" class="pr">
            <a style="cursor:pointer;" class="nav-user"><i style="font-size:22px;margin-right:5px" class="el-icon-user-solid"></i><span>{{user.username}}</span> </a>
            <div class="nav-user-wrapper pa">
              <div class="nav-user-list">
                <ul>
                  <li class="nav-user-avatar">
                    <div><span class="avatar" :style="user.header ? 'background-image: url('+user.header+');':'background-image: url(https://coolmall-oss.oss-cn-hangzhou.aliyuncs.com/2020-12-18/01e615a1-9cc9-4c08-8686-30550325a8a4_logo.png);'"></span></div>
                    <p class="name">{{user.username}}</p>
                  </li>
                  <li><router-link :to="{name:'ShoppingCart'}" class="nav-user-list-item">购物车({{carts.length}})</router-link></li>
                  <li><router-link :to="{name:'Order'}" class="nav-user-list-item">我的订单</router-link></li>
                  <li><router-link :to="{name:'Information'}" class="nav-user-list-item">账户资料</router-link></li>
                  <li><router-link :to="{name:'Address'}" class="nav-user-list-item">收货地址</router-link> </li>
                  <li @click="logout">退出</li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else>
            <router-link :to="{name:'Login'}" >登录</router-link>
            <span>|</span>
            <router-link :to="{name:'Regist'}">注册</router-link>
          </div>
        </div>
      </div>
    </div>
    <div style="height:69px"></div>
    <transition name="fade">
      <router-view></router-view>
    </transition>

    <div class="footer">
      <div class="inter1">
        <div class="left">
          <a href=""><img src="./style/images/logo.png" alt=""></a>
          <p>青竹良品原创生活类电商品牌，秉承一贯的严谨态度，我们深入世界各地，从源头全程严格把控商品生产环节，力求帮消费者甄选到最优质的商品，全线采用天然原材料，控制甲醛低量无害，采用进口工艺，国际生产线不断优化，食材保证核心原产地新鲜直供，让你享受品质生活</p>
        </div>
        <div class="center">
          <dl>
            <dt><a href="">关于我们</a></dt>
            <dd><a href="">我的品牌</a></dd>
            <dd><a href="">公司动态</a></dd>
            <dd><a href="">经历发展</a></dd>
            <dd><a href="">商品推广</a></dd>
          </dl>
          <dl>
            <dt><a href="">支付方式</a></dt>
            <dd><a href="">微信支付</a></dd>
            <dd><a href="">支付宝</a></dd>
            <dd><a href="">百度钱包</a></dd>
            <dd><a href="">货到付款</a></dd>
          </dl>
          <dl>
            <dt><a href="">相关服务</a></dt>
            <dd><a href="">退货政策</a></dd>
            <dd><a href="">购物流程</a></dd>
            <dd><a href="">客服服务</a></dd>
            <dd><a href="">商务合作</a></dd>
          </dl>
        </div>
        <div class="right">
          <img src="./assets/hanfeng.png" alt="">
          <img src="./assets/hanfeng.png" alt="">
          <span>微信公众号</span>
          <span>微博公众号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/style/css/common.css'
import '@/style/iconfont/iconfont.css'
import { clearLoginInfo } from '@/utils/utils'
export default {
  data () {
    return {
      searchText: '',
      login: false
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.user.user
      },
      set (val) {
        this.$store.commit('user/updateUser', val)
      }
    },
    carts: {
      get () {
        return this.$store.state.user.carts
      },
      set (val) {
        this.$store.commit('user/updateCarts', val)
      }
    }
  },
  watch: {
    $route (to, from) {
      if (from.name === 'OrderConfirm') {
        this.$cookie.delete('payList')
      }
      this.checkLogin()
    }
  },
  methods: {
    getMemberInfo () {
      this.$http({
        url: this.$http.adornUrl('/member/member/baseInfo'),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.user = data.member
          this.carts = data.member.carts
          this.login = true
        } else {
          this.$notify({
            title: '登录失效, 请重新登录',
            type: 'error',
            duration: 1500
          })
          this.login = false
          clearLoginInfo()
        }
      })
    },
    doSearch (e) {
      if (e.keyCode === 13) {
        this.search()
      }
    },
    search () {
      this.$router.push({
        path: '/product/list',
        query: {
          keyword: this.searchText,
          t: new Date().getTime()
        }
      })
    },
    logout () {
      clearLoginInfo()
      this.login = false
      this.$notify.success({
        title: '退出登录成功',
        type: 'error',
        duration: 1500
      })
    },
    checkLogin () {
      const token = this.$cookie.get('token')
      if (token !== null) {
        // todo 去后台验证token
        this.getMemberInfo()
      } else {
        this.login = false
      }
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>
<style src="@/style/css/app.css" scoped>

</style>
