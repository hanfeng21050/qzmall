<template>
  <div class="page-order-pay" v-loading="loading" :element-loading-text="loadingText">
    <el-steps :active="3" finish-status="success" align-center>
      <el-step title="我的购物车"></el-step>
      <el-step title="核对订单信息"></el-step>
      <el-step title="支付订单"></el-step>
    </el-steps>
    <div class="section-con">
      <div class="gray-box">
        <div class="sec-title-border clearfix">
          <h3>支付订单</h3>
        </div>
        <div class="order-pay">
          <div class="order-pay-title">
            <dl>
              <dt><img src="../assets/logo.png" alt=""></dt>
              <dd>
                <span>订单提交成功，请尽快付款！订单号：{{order.orderSn}}</span>
                <span>应付金额 <font>{{order.payAmount}}</font>元</span>
              </dd>
              <dd>
                <span>请您在<font style="font-size:30px; color:red; padding:0 20px">{{this.time}}</font>内完成支付，否则订单会被自动取消(库存紧订单请参见详情页时限)</span>
                <span @click="showDetail = !showDetail">订单详细</span>
              </dd>
            </dl>
          </div>
          <el-collapse-transition>
            <div class="order-detail" v-show="showDetail">
              <div class="order-detail-item" v-for="(item,index) in orderItemList" :key="index">
                <div class="product-con">
                  <span>
                    <a @click="toProductDetail(item.skuId)">{{item.skuName}}</a>
                  </span>
                </div>
                <div class="product-num">数量: {{item.skuQuantity}}</div>
                <div class="product-price">单价: {{item.skuPrice}}</div>
                <div class="product-total">总计: {{item.realAmount}}</div>
              </div>

            </div>
          </el-collapse-transition>

          <div class="order-con">
            <div class="pay-type">
              <el-radio v-model="radio1" label="1" border>支付宝</el-radio>
              <el-radio v-model="radio1" label="2" border>微信</el-radio>
            </div>
            <div class="qr-code">
              <img src="../assets/logo.png">
            </div>
            <el-button type="warning" style="float: right" @click="pay()">立即支付</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatMoney, countDown } from '@/utils/utils'
export default {
  components: {},
  data () {
    return {
      radio1: '1',
      showDetail: false,
      loading: false,
      loadingText: '',
      order: {},
      orderItemList: [],
      time: '00:00'
    }
  },
  computed: {},
  watch: {},
  methods: {
    payRemainingTime (time) {
      if (this.order.status === 0) {
        var now = new Date().getTime()
        var endtime = new Date(new Date(time).getTime() + 30 * 60 * 1000)
        var second = Math.round((endtime - now) / 1000)
        const timer = setInterval(() => {
          second = second - 1
          this.time = countDown(second)

          if (time < 0) {
            clearInterval(timer)
            this.getOrderDetail()
          }
        }, 1000)
      }
    },
    getOrderDetail () {
      const orderId = this.$route.query.orderId
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/order/order/getOrderDetail/' + orderId),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        }
      })
        .then(({ data }) => {
          if (data && data.code === 0) {
            const order = data.data.order
            if (order.status === 4) {
              this.$alert('当前订单已取消', '提示', {
                confirmButtonText: '确定',
                callback: (action) => {
                  this.$router.push({ name: 'Order' })
                }
              })
            } else if (order.status === 0) {
              this.order = data.data.order
              this.payRemainingTime(this.order.createTime)
              // 格式化
              this.order.payAmount = formatMoney(this.order.payAmount, 2)
              this.orderItemList = data.data.orderItemList.map((item) => {
                item.skuPrice = formatMoney(item.skuPrice, 2)
                item.realAmount = formatMoney(item.realAmount, 2)
                return item
              })
            } else {
              this.$alert('当前订单已支付', '提示', {
                confirmButtonText: '确定',
                callback: (action) => {
                  this.$router.push({ name: 'Order' })
                }
              })
            }
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
    },
    toProductDetail (id) {
      this.$router.push({
        name: 'ProductDetail',
        query: {
          skuId: id
        }
      })
    },
    pay () {
      const orderId = this.$route.query.orderId
      this.loadingText = '支付中,请稍等'
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/order/order/pay/' + orderId),
        method: 'post',
        headers: {
          token: this.$cookie.get('token')
        }
      })
        .then(({ data }) => {
          if (data && data.code === 0) {
            this.$notify({
              title: '支付成功',
              type: 'success',
              duration: 3000
            })
            this.$router.push({ name: 'Order' })
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
    this.getOrderDetail()
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
<style scoped src="../style/css/order-pay.css">
</style>
