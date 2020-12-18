<template>
  <div class="body">
    <div class="regist">
      <div class="title">
        <div class="left">
          登录
        </div>
        <div class="right">
          没有账号?
          <router-link to="/regist">立即注册</router-link>
        </div>
      </div>
      <el-form ref="form" status-icon :rules="rules" :model="form">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" class="e-input">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" class="e-input">
            <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submitForm('form')" :loading="loginLoading">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    var validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }

    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      sendLoading: false,
      loginLoading: false,
      countdown: 10,
      form: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 发送验证码
    send () {
      const interval = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearInterval(interval)
          this.sendLoading = false
          this.countdown = 10
          return
        }
        this.sendLoading = true
      }, 1000)
    },
    // 登录
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginLoading = true
          this.$http({
            url: this.$http.adornUrl('/auth/login'),
            method: 'post',
            data: this.$http.adornData(this.form, false)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$notify({
                title: '登录成功',
                type: 'success',
                duration: 1500
              })
              this.$cookie.set('token', data.token, 1)
              this.$store.commit('user/updateUser', data.user)
              this.$router.go(-1)
            } else {
              this.$notify.error(data.msg)
            }
            this.loginLoading = false
          },
          (error) => {
            this.$notify({
              title: error.message,
              type: 'error'
            })
            this.loginLoading = false
          }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    createCode () {}
  },
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
<style scoped>
.body {
  background-color: #f2f2f2;
  padding: 144px 0 80px 0;
}

.regist {
  width: 300px;
  background-color: #ffffff;
  padding: 50px 50px 50px 50px;
  margin: 0 auto;
}

.regist .title {
  display: flex;
  padding: 10px 0;
}
.regist .title .left {
  font-size: 20px;
  font-weight: bolder;
  flex: 1;
}
.regist .title .right {
  line-height: 30px;
  font-size: 10px;
  color: gray;
}
.regist .title .right a {
  color: #e6a23c;
}

.e-input {
  width: 300px;
}
</style>
