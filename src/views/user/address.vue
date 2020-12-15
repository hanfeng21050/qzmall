<template>
  <div class="s_content">
    <div class="gray-box">
      <div class="addressBox clearfix">
        <div class="address-item" v-for="(item,index) in addressList" :key="index">
          <div class="address-item-in">
            <div class="default-address" v-if="item.defaultStatus === 1">默认地址</div>
            <div>收货人：{{item.name}}</div>
            <div :title="item.province + item.city + item.region + item.detailAddress">收货地址：{{item.province + item.city + item.region + item.detailAddress}}</div>
            <div>电话号码：{{item.phone}}</div>
            <div class="optional-seletion">
              <div class="btn" @click="openForm('update', item.id)">修改</div>
              <div class="btn" @click="deleteAddress($event, item.id)">删除</div>
            </div>
          </div>
        </div>

        <div class="address-item">
          <div class="address-item-in add-address" @click="openForm('add')">
            <div style="text-align:center">
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAxMTQ3ODk4MzAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwODUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxNS4yIDc5LjJjLTI0My4yIDAtNDQwIDE5Ni44LTQ0MCA0MzkuMnMxOTYuOCA0MzkuMiA0MzkuMiA0MzkuMmMyNDIuNCAwIDQzOS4yLTE5Ni44IDQzOS4yLTQzOS4yUzc1Ny42IDc5LjIgNTE1LjIgNzkuMnogbTI0MS42IDQ2MEg1MzZ2MjIxLjZoLTQxLjZWNTM5LjJIMjcyLjh2LTQxLjZoMjIxLjZWMjc2LjhINTM2djIyMS42aDIyMS42djQwLjh6IiBwLWlkPSIxMDg2IiBmaWxsPSIjNjI2MjYyIj48L3BhdGg+PC9zdmc+"
                alt="">
              <div>添加新地址</div>
            </div>
          </div>

        </div>
      </div>

    </div>
    <el-dialog title="收货地址" :visible.sync="formVisible" width="30%" @closed="resetForm('form')" :lock-scroll="false">
      <el-form :model="addrForm" :rules="rules" ref="form" label-width="80px" label-position="left" size="small">
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addrForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="addrForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="addr">
          <el-cascader style="width:100%" v-model="addrForm.addr" placeholder="试试搜索：指南" :options="areaList" :props="props" filterable></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAddress">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="addrForm.detailAddress" maxlength="255" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="addrForm.postCode"></el-input>
        </el-form-item>
        <el-form-item label="置为默认" v-if="mod !== 'add'">
          <el-switch v-model="addrForm.defaultStatus" :active-value=1 :inactive-value=0></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="warning" @click="saveAddress('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import areaData from '@/style/js/areaList'
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
    return {
      areaList: [],
      addressList: [],
      formVisible: false,
      mod: 'add',
      props: {
        value: 'value',
        label: 'value'
      },
      addrForm: {
        name: '',
        phone: '',
        postCode: '',
        addr: '',
        province: '',
        city: '',
        region: '',
        detailAddress: '',
        defaultStatus: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        postCode: [{ required: true, message: '请输入邮编', trigger: 'blur' }],
        addr: [{ required: true, message: '请输入地址', trigger: 'change' }],
        detailAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    getAddrList () {
      this.$http({
        url: this.$http.adornUrl(
          '/member/memberreceiveaddress/getAddrByMemberId'
        ),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          this.addressList = data.data
        } else {
          this.$notify({
            title: data.code,
            message: data.msg,
            type: 'error',
            duration: 1500
          })
        }
      })
    },
    openForm (mod, id) {
      this.mod = mod
      if (mod === 'update') {
        this.$http({
          url: this.$http.adornUrl('/member/memberreceiveaddress/info/' + id),
          method: 'get',
          headers: {
            token: this.$cookie.get('token')
          }
        }).then(({ data }) => {
          if (data && data.code === 0) {
            const addr = [data.data.province, data.data.city, data.data.region]
            this.addrForm = data.data
            this.addrForm.addr = addr
          } else {
            this.$notify({
              title: data.code,
              message: data.msg,
              type: 'error',
              duration: 1500
            })
          }
        })
      }
      this.formVisible = true
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 删除地址
    deleteAddress: function (e, id) {
      e.stopPropagation()
      // 根据索引删除addressList的记录

      this.$http({
        url: this.$http.adornUrl('/member/memberreceiveaddress/delete/' + id),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.getAddrList()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 1500
          })
        } else {
          this.$notify({
            title: data.code,
            message: data.msg,
            type: 'error',
            duration: 1500
          })
        }
      })
    },
    // 添加地址
    saveAddress (formName) {
      this.$refs[formName].validate((valid) => {
        this.addrForm.province = this.addrForm.addr[0]
        this.addrForm.city = this.addrForm.addr[1]
        this.addrForm.region = this.addrForm.addr[2]
        const url =
          this.mod === 'add'
            ? '/member/memberreceiveaddress/save'
            : '/member/memberreceiveaddress/update'
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(url),
            method: 'post',
            headers: {
              token: this.$cookie.get('token')
            },
            data: this.$http.adornData(this.addrForm, false)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.formVisible = false
              this.getAddrList()
              this.$notify({
                title: '保存成功',
                type: 'success',
                duration: 1500
              })
            } else {
              this.$notify({
                title: data.code,
                message: data.msg,
                type: 'error',
                duration: 1500
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    this.areaList = areaData.getAreaList()
    this.getAddrList()
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
.s_content {
  width: 100%;
  background-color: #ffffff;
}
.gray-box {
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgb(0 0 0 / 50%);
  padding: 10px;
  box-sizing: border-box;
}
.addressBox {
  margin-bottom: 15px;
  margin-left: -7px;
  margin-right: -7px;
}

.addressBox .address-item {
  float: left;
  width: 33%;
  line-height: 2;
  color: #848383;
  cursor: pointer;
}

.addressBox .address-item:nth-child(3n + 1) {
  clear: both;
}

.addressBox .address-item .address-item-in {
  padding: 15px 30px;
  margin: 0 7px 15px 7px;
  box-sizing: border-box;
  height: 120px;
  font-size: 14px;
  border: 1px solid #d6d6d6;
  position: relative;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
}
.add-address {
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-item-in.add-address:hover {
  background-color: rgb(247, 247, 247);
}
.add-address img {
  width: 30px;
  height: 30px;
}
.addressBox .address-item .address-item-in .default-address {
  position: absolute;
  background-color: rgb(243, 154, 19);
  color: #fff;
  padding: 0 5px;
  border-radius: 3px;
  font-size: 10px;
  bottom: 0;
  left: 0;
}

.addressBox .address-item .address-item-in .optional-seletion {
  display: none;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 99;
}
.addressBox .address-item .address-item-in .optional-seletion .btn {
  height: 50%;
  width: 50px;
  font-size: 14px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(221, 220, 220);
  background-color: #fff;
}

.addressBox .address-item .address-item-in div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.addressBox .address-item.selected .address-item-in {
  border-color: #f1bb69;
  background-color: #fff;
}

.addressBox .address-item .address-item-in:hover .optional-seletion {
  display: block;
}

.addressBox .address-item .address-item-in .optional-seletion .btn:hover {
  background-color: rgb(248, 248, 248);
}
</style>
