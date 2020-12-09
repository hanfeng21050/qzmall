<template>
  <div class="body">
    <div class="header">
      <div class="inter">
        <router-link to="/" class="logo"><img src="./style/images/logo.png" alt=""></router-link>
        <ul>
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/product/list">查看所有类别</router-link>
          </li>
        </ul>
        <el-input v-model="searchText" placeholder="请输入内容" size="small " prefix-icon="iconfont icon-sousuo" style="display:inline-block; width:300px;line-height:68px;"></el-input>
        <el-button plain size="small" type="warning" style="margin-left:5px" @click="search">搜索</el-button>
        <div class="inter_right">
          <div v-if="login">
            <router-link to="/">欢迎你: <span>{{username}}</span></router-link>
            <a style="cursor:pointer" @click="logout">退出登录</a>
            <router-link to="/shoppingcart"><i class="icon iconfont icon-gouwuche" id="shop"></i>0</router-link>
          </div>
          <div v-else>
            <router-link to="/login">登录</router-link>
            <span>|</span>
            <router-link to="/regist">注册</router-link>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>

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
          <img src="./style/images/weixin.png" alt="">
          <img src="./style/images/weibo.png" alt="">
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
export default {
  data () {
    return {
      searchText: '',
      username: '',
      login: false
    }
  },
  watch: {
    $route (to, from) {
      this.checkLogin()
    }
  },
  methods: {
    search () {
      this.$router.push(
        {
          path: '/product/list',
          query: {
            spuName: this.searchText
          }
        }
      )
    },
    logout () {
      this.username = ''
      this.login = false
      this.$cookies.remove('token')
      this.$cookies.remove('user')
      this.$notify.success('退出登录成功')
    },
    checkLogin () {
      const token = this.$cookies.get('token')
      // todo 去后台验证token
      if (token !== null) {
        this.login = true
        this.username = this.$cookies.get('user').username
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
<style scoped>
.el-notification__icon {
  margin: 0;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;
  background-color: #ffffff;
  border-bottom: 1px solid #c2a485;
  z-index: 99;
}
.header .inter {
  width: 1140px;
  height: 68px;
  background-color: #ffffff;
  /*background-color: gainsboro;*/
  margin: 0 auto;
}

.header .inter .logo {
  float: left;
  width: 162px;
  height: 100%;
  text-align: center;
}

.header .inter img {
  width: 110px;
  margin: 20px auto;
  height: 27.88px;
  line-height: 27.88px;
}

.header .inter ul li {
  float: left;
  list-style: none;
  padding: 0 28px;
  height: 68px;
  line-height: 68px;
}
.header .inter ul li:hover a {
  color: #c78a49;
}
.header .inter ul li a {
  font-size: 14px;
  color: #333;
}
.header .inter .inter_right {
  float: right;
}

.header .inter .inter_right a {
  font-size: 14px;
  color: #555;
  height: 68px;
  line-height: 68px;
  padding: 10px;
}

.footer {
  width: 100%;
  height: 390px;
  background-color: #faf8f8;
  border-top: 1px solid #c2a485;
}
.footer .inter1 {
  width: 1140px;
  height: 228px;
  /*background-color: #55a532;*/
  padding-top: 58px;
}
.footer .inter1 .left {
  float: left;
  width: 307px;
  height: 160px;
  /*background-color: #FF5000;*/
  margin-right: 30px;
}
.footer .inter1 .left img {
  width: 110px;
  height: 28px;
}
.footer .inter1 .left p {
  font-size: 12px;
  margin-top: 10px;
  color: #999999;
}
.footer .inter1 .center {
  float: left;
  width: 490px;
  height: 178px;
  /*line-height: 30px;*/
  /*background-color: #795da3;*/
  margin-right: 30px;
}
.footer .inter1 .center dl {
  float: left;
  width: 153px;
  height: 156px;
  font-size: 12px;
  line-height: 30px;
}
.footer .inter1 .center dl:nth-child(1) {
  padding-left: 30px;
}
.footer .inter1 .center dl dt {
  font-size: 14px;
}
.footer .inter1 .center dl a {
  color: #666;
}
.footer .inter1 .right {
  float: right;
  width: 274px;
  height: 139px;
  /*background-color: lightcoral;*/
}
.footer .inter1 .right img {
  float: left;
  width: 120px;
  height: 120px;
  padding-right: 8px;
  padding-left: 8px;
}
.footer .inter1 .right span {
  float: left;
  font-size: 14px;
  color: #666;
  padding-left: 30px;
  padding-right: 35px;
}
.footer .inter1 .left p:hover,
.footer .inter1 dt a:hover,
.footer .inter1 dd a:hover,
.footer .inter1 .right span:hover {
  color: #d5a879;
}

.footer hr {
  border: 0.5px solid #e6e6e6;
}
</style>
