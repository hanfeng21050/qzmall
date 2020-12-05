<template>
  <div class="body">
    <div class="regist">
      <div class="title">
        <div class="left">
          注册
        </div>
        <div class="right">
          已有账号
          <router-link to="/login">立即登录</router-link>
        </div>
      </div>
      <el-form ref="form" status-icon :rules="rules" :model="form">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" class="e-input">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" class="e-input">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" class="e-input">
            <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input type="password" v-model="form.checkPassword" placeholder="请确认密码" class="e-input">
            <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码" style="width:170px" class="e-input">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
          <el-button type="warning" style="float:right;width:112px;" :disabled="sendLoading" @click="send">{{!sendLoading ? '获取验证码' : countdown+'秒'}}</el-button>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submitForm('form')" :loading="registLoading">立即注册</el-button>
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

    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        this.userNameCheck = false
        callback(new Error('请输入用户名'))
      } else {
        const flag = true
        setTimeout(() => {
          if (flag) {
            callback()
          } else {
            this.userNameCheck = false
            callback(new Error('用户名已存在'))
          }
        }, 1000)
      }
    }

    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword')
        }
        callback()
      }
    }

    var validatePasswordConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      sendLoading: false,
      registLoading: false,
      countdown: 10,
      form: {
        mobile: '',
        username: '',
        password: '',
        checkPassword: '',
        code: ''
      },
      rules: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        checkPassword: [
          { validator: validatePasswordConfirm, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
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

      // todo regist
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registLoading = true
          setTimeout(() => {
            this.registLoading = false
            alert('submit!')
          }, 1000)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
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
  padding: 50px 50px 20px 50px;
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
