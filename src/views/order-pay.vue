<template>
  <div class="page-order-pay" v-loading="loading">
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
                <span>推荐使用</span>
                <span>扫码支付请您在<font>24小时</font>内完成支付，否则订单会被自动取消(库存紧订单请参见详情页时限)</span>
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
            <el-button type="warning" style="float: right">立即支付</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatMoney } from '@/utils/utils'
export default {
  components: {},
  data () {
    return {
      radio1: '1',
      showDetail: false,
      loading: false,
      order: {},
      orderItemList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getOrderDetail () {
      const orderId = this.$route.query.orderId
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/order/order/getOrderDetail/' + orderId),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.order = data.data.order
          // 格式化
          this.order.payAmount = formatMoney(this.order.payAmount, 2)
          this.orderItemList = data.data.orderItemList.map((item) => {
            item.skuPrice = formatMoney(item.skuPrice, 2)
            item.realAmount = formatMoney(item.realAmount, 2)
            return item
          })
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
    },
    toProductDetail (id) {
      this.$router.push({
        name: 'ProductDetail',
        query: {
          skuId: id
        }
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
