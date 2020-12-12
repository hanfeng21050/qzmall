<template>
  <div class="page-order-comfirm">
    <el-steps :active="step" finish-status="success" align-center>
      <el-step title="我的购物车"></el-step>
      <el-step title="核对订单信息"></el-step>
      <el-step title="支付订单"></el-step>
    </el-steps>
    <div class="section-con">
      <div class="gray-box" v-show="step === 3">
        <div class="sec-title-border clearfix">
          <h3>支付订单</h3>
        </div>
        <div class="order-pay">
          <div class="order-pay-title">
            <dl>
              <dt><img src="../assets/logo.png" alt=""></dt>
              <dd>
                <span>订单提交成功，请尽快付款！订单号：70715901829</span>
                <span>应付金额<font>28.90</font>元</span>
              </dd>
              <dd>
                <span>推荐使用</span>
                <span>扫码支付请您在<font>24小时</font>内完成支付，否则订单会被自动取消(库存紧订单请参见详情页时限)</span>
                <span>订单详细</span>
              </dd>
            </dl>
          </div>
          <div class="order-con">
            <div class="pay-type">
              <el-radio v-model="radio1" label="1" border>支付宝</el-radio>
              <el-radio v-model="radio1" label="2" border>微信</el-radio>
            </div>
            <div class="qr-code">
              <img src="../assets/logo.png">
            </div>
            <el-button type="warning" style="float: right">立即支付</el-button>
          </div>
        </div>
      </div>
      <div class="gray-box" v-show="step === 2">
        <div class="sec-title-border clearfix">
          <h3>添加收货地址</h3>
          <a class="right" @click="openForm('add')">新增地址</a>
        </div>
        <div class="addressBox clearfix">
          <div class="address-item" v-for="(item,index) in addressList" :key="index" :class="{'selected':item.defaultStatus}" @click="selectAddr(index)">
            <div class="address-item-in">
              <div>收货人：{{item.name}}</div>
              <div :title="item.province + item.city + item.region + item.detailAddress">收货地址：{{item.province + item.city + item.region + item.detailAddress}}</div>
              <div>电话号码：{{item.phone}}</div>
              <div class="optional-seletion">
                <div class="btn" @click="openForm('update', item.id)">修改</div>
                <div class="btn" @click="deleteAddress($event, item.id)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gray-box" v-show="step === 2">
        <div class="sec-title-border clearfix">
          <h3>支付方式</h3>
        </div>
        <div class="pay-mod">
          <div class="pay-item" v-for="(pay, index) in payMod" @click="selectPayment(index)" :key="index" :class="{'selected':pay.selected}">{{pay.payName}}</div>
        </div>
      </div>

      <div class="gray-box" v-show="step === 2">
        <div class="sec-title-border mb0 clearfix">
          <h3>商品清单</h3>
        </div>
        <div class="page-shopping-cart" id="shopping-cart">
          <div class="cart-product clearfix">
            <table>
              <thead>
                <tr class="cart-product-title">
                  <th class="td-product">商品</th>
                  <th class="td-num">数量</th>
                  <th class="td-price">单价(元)</th>
                  <th class="td-total">金额(元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in productList" :key="index">
                  <td class="td-product">
                    <img :src="item.skuPic" width="98" height="98">
                    <div class="product-info">
                      <h3><a :title="item.pro_name">{{item.skuName}}</a></h3>
                      <p>品牌：{{item.spuBrand}}</p>
                      <p v-for="(attr, index) in JSON.parse(item.skuAttrsVals)" :key="index">{{attr.attrValue}} : {{attr.attrName}}</p>
                    </div>
                    <div class="clearfix"></div>
                  </td>
                  <td class="td-num">
                    <div class="product-num">
                      <p>{{item.skuQuantity}}</p>
                    </div>
                  </td>
                  <td class="td-price">
                    <p class="red-text">￥<span class="price-text">{{item.skuPrice.toFixed(2)}}</span></p>
                  </td>
                  <td class="td-total">
                    <p class="red-text">￥<span class="total-text">{{(item.skuPrice*item.skuQuantity).toFixed(2)}}</span></p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="cart-product-info">
            <router-link class="keep-shopping" to="/shoppingcart" replace>返回</router-link>
            <a class="btn-buy fr" href="javascript:;" @click="submitOrder">提交订单</a>
            <p class="fr product-total">￥<span>{{getTotal.totalPrice.toFixed(2)}}</span></p>
            <p class="fr check-num"><span>{{getTotal.totalNum}}</span>件商品总计（不含运费）：</p>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="收货地址" :visible.sync="formVisible" width="30%" @closed="resetForm('form')">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="warning" @click="saveAddress('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import areaData from '../style/js/areaList'
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
      radio1: '1',
      step: 2,
      props: {
        value: 'value',
        label: 'value'
      },
      mod: '',
      areaList: [],
      formVisible: false,
      payMod: [
        {
          payType: 0,
          payName: '在线支付',
          selected: true
        },
        {
          payType: 1,
          payName: '货到付款',
          selected: false
        }
      ],
      addrForm: {
        name: '',
        phone: '',
        postCode: '',
        addr: '',
        province: '',
        city: '',
        region: '',
        detailAddress: ''
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
      },
      productList: [],
      addressList: [
        {
          id: 1,
          memberId: 1,
          name: '某某1',
          phone: '12345678901',
          postCode: '12345',
          province: '浙江省',
          city: '杭州市',
          region: '江干区',
          detailAddress: '浙江理工大学',
          defaultStatus: true
        },
        {
          id: 2,
          memberId: 2,
          name: '某某2',
          phone: '12345678901',
          postCode: '12345',
          province: '浙江省',
          city: '杭州市',
          region: '江干区',
          detailAddress: '浙江理工大学',
          defaultStatus: false
        }
      ],
      countNum1: 0
    }
  },
  computed: {
    getTotal: function () {
      // 获取productList中select为true的数据。
      var _proList = this.productList
      var totalPrice = 0
      for (var i = 0, len = _proList.length; i < len; i++) {
        // 总价累加
        totalPrice += _proList[i].skuQuantity * _proList[i].skuPrice
      }
      // 选择产品的件数就是_proList.length，总价就是totalPrice
      return { totalNum: _proList.length, totalPrice: totalPrice }
    }
  },
  watch: {},
  methods: {
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
    // 获取地址
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
    // 获取选中产品
    getProductList () {
      this.$http({
        url: this.$http.adornUrl('/member/cartinfo/getListByIds'),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        },
        params: this.$http.adornParams({
          ids: this.$cookie.get('payList')
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          this.productList = data.data
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
    // 选中地址
    selectAddr: function (index) {
      // 遍历addressList
      for (var i = 0, len = this.addressList.length; i < len; i++) {
        this.addressList[i].defaultStatus = false
      }
      this.addressList[index].defaultStatus = true
    },
    // 选中支付方式
    selectPayment (index) {
      for (var i = 0; i < this.payMod.length; i++) {
        this.payMod[i].selected = false
      }
      this.payMod[index].selected = true
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
    },
    submitOrder () {
      this.step = 3
    }
  },
  created () {
    this.areaList = areaData.getAreaList()
    this.getAddrList()
    this.getProductList()
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
<style scoped src="../style/css/order-confirm.css">
</style>
