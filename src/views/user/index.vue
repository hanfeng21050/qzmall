<template>
  <div class="s_content">
    <div class="content">
      <div class="account-sidebar">
        <div class="avatar gray-box ">
          <div><img src="@/assets/logo.png">
            <h5>
              test</h5>
          </div>
          <div class="box-inner">
            <ul class="account-nav">
              <li class="current"><a href="javascript:;">我的订单</a></li>
              <li class=""><a href="javascript:;">账户资料</a></li>
              <li class=""><a href="javascript:;">收货地址</a></li>
              <li class=""><a href="javascript:;">我的优惠</a></li>
              <li class=""><a href="javascript:;">售后服务</a></li>
              <li class=""><a href="javascript:;">以旧换新</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="account-content">
        <div class="gray-box">
          <div class="title">
            <div>我的订单</div>
            <div></div>
          </div>
        </div>

        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style src="@/style/css/user/index.css" scoped>
</style>
