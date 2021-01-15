<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="头像">
          <el-upload :before-upload="beforeUpload" :data="dataObj" action="http://coolmall-oss.oss-cn-hangzhou.aliyuncs.com" :show-file-list="false" :on-success="handleAvatarSuccess">
            <el-image v-if="form.header" :src="form.header" class="avatar" fit="scale-down" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
            <el-option label="保密" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期" v-model="form.birth"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="签名">
          <el-input type="textarea" v-model="form.sign"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { policy } from '@/utils/upload'
import { getUUID } from '@/utils/utils'
export default {
  components: {},
  data () {
    return {
      loading: false,
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: '',
        uuid: ''
      },
      form: {
        id: '',
        username: '',
        mobile: '',
        email: '',
        header: '',
        gender: '',
        birth: '',
        sign: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    beforeUpload (file) {
      const _self = this
      return new Promise((resolve, reject) => {
        policy()
          .then((response) => {
            // eslint-disable-next-line no-template-curly-in-string
            _self.dataObj.policy = response.data.policy
            _self.dataObj.signature = response.data.signature
            _self.dataObj.ossaccessKeyId = response.data.accessid
            // eslint-disable-next-line no-template-curly-in-string
            _self.dataObj.key = response.data.dir + getUUID() + '_${filename}'
            _self.dataObj.dir = response.data.dir
            _self.dataObj.host = response.data.host
            resolve(true)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    handleAvatarSuccess (res, file) {
      this.form.header =
        this.dataObj.host +
        '/' +
        // eslint-disable-next-line no-template-curly-in-string
        this.dataObj.key.replace('${filename}', file.name)
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http({
            url: this.$http.adornUrl('/member/member/update'),
            headers: {
              token: this.$cookie.get('token')
            },
            method: 'post',
            data: this.$http.adornData(this.form, false)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$notify({
                title: '修改成功',
                type: 'success',
                duration: 1500
              })
              this.getMemberInfo()
            } else {
              this.$notify({
                title: data.code,
                message: data.msg,
                type: 'error',
                duration: 1500
              })
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getMemberInfo () {
      this.loading = true

      this.$http({
        url: this.$http.adornUrl('/member/member/info'),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        },
        params: this.$http.adornParams({})
      })
        .then(({ data }) => {
          if (data && data.code === 0) {
            this.form = data.member
          } else {
            this.$notify({
              title: data.code,
              message: data.msg,
              type: 'error',
              duration: 1500
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  created () {
    this.$store.commit('user/updateUserMenuTitle', '用户资料')
    this.getMemberInfo()
  },
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
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #533b3b;
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  border: 1px dashed #533b3b;
  width: 100px;
  height: 100px;
  line-height: 100px;
}
</style>
