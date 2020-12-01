<template>
  <div class="body">
    <div class="outer7">
      <h4>注册</h4>
      <form action="">
        <div class="div">
          <input type="text" placeholder="手机/邮箱/用户名" name="username">
        </div>
        <div class="div div1">
          <input type="text" placeholder="手机验证码" name="code">
          <span class="sp2">获取验证码</span>
        </div>
        <div class="div">
          <input type="password" placeholder="设置密码" name="password">
        </div>
        <div class="div">
          <input type="password" placeholder="确认密码" name="repassword">
        </div>
        <div class="inter1">
          <span>已有账号，请</span><router-link to="/login">直接登录</router-link>
        </div>
        <input type="submit" value="注册" id="submit">
      </form>
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
<style scoped src="../style/css/regist.css">
</style>
