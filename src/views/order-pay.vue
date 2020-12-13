<template>
  <div class="page-order-pay">
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
                <span>订单提交成功，请尽快付款！订单号：xxxxxxxxxx</span>
                <span>应付金额<font>123</font>元</span>
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
              <div class="order-detail-item">
                <div class="product-con">
                  <span>iPhone 12 白色 256GB 支持移</span>
                </div>
                <div class="product-num">数量:1</div>
                <div class="product-price">单价:1</div>
                <div class="product-total">总计$100</div>
              </div>
              <div class="order-detail-item">
                <div class="product-con">
                  <span>iPhone 12 白色 256GB 支持移</span>
                </div>
                <div class="product-num">数量:1</div>
                <div class="product-price">单价:1</div>
                <div class="product-total">总计$100</div>
              </div>
              <div class="order-detail-item">
                <div class="product-con">
                  <span>iPhone 12 白色 256GB 支持移</span>
                </div>
                <div class="product-num">数量:1</div>
                <div class="product-price">单价:1</div>
                <div class="product-total">总计$100</div>
              </div>
              <div class="order-detail-item">
                <div class="product-con">
                  <span>iPhone 12 白色 256GB 支持移</span>
                </div>
                <div class="product-num">数量:1</div>
                <div class="product-price">单价:1</div>
                <div class="product-total">总计$100</div>
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
export default {
  components: {},
  data () {
    return {
      radio1: '1',
      showDetail: false
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {
    console.log(this.$route.query.orderId)
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
