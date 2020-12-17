<template>
  <div class="s_content" v-loading="loading">
    <div class="order-status">
      <el-steps v-if="order.status === 4" :active="2" align-center finish-status="process">
        <el-step title="下单"></el-step>
        <el-step title="订单关闭"></el-step>
      </el-steps>
      <el-steps v-else :active="step.active" align-center finish-status="success">
        <el-step v-for="(item, index) in step.items" :title="item.title" :description="item.description" :key="index"></el-step>
      </el-steps>
    </div>
    <div class="status-now">
      <ul>
        <li class="status-title">
          <h3>订单状态：{{orderStatusText(order.status)}}</h3>
        </li>
      </ul>
      <p class="realtime"><span>{{getStatusDescriptionText(order.status)}}</span></p>
    </div>

    <div class="gray-sub-title cart-title">
      <div class="first">
        <div><span class="order-id">商品名称</span></div>
        <div class="f-bc"><span class="price">单价</span> <span class="num">数量</span>
          <span class="operation">小计</span>
        </div>
      </div>
    </div>

    <div class="goods-table">
      <div class="cart-items" v-for="(item, i) in orderItemList" :key="i">
        <a class="img-box">
          <img alt="" :src="item.skuPic"></a>
        <div class="name-cell ellipsis"><a :title="item.skuName" target="_blank" >{{item.skuName}}</a></div>
        <div class="n-b">
          <div class="price">¥ {{item.skuPrice}}</div>
          <div class="goods-num">{{item.skuQuantity}}</div>
          <div class="subtotal"> ¥ {{item.skuPrice * item.skuQuantity}}</div>
        </div>
      </div>
    </div>

    <div class="order-discount-line">
      <p style="font-size: 14px; font-weight: bolder;"><span style="padding-right: 47px;">商品总计：</span> <span style="font-size: 16px; font-weight: 500; line-height: 32px;">¥  {{totalPrice.toFixed(2)}}</span></p>
      <p><span style="padding-right: 30px;">运费：</span><span style="font-weight: 700;">+ ¥ 0.00</span></p>
      <p class="price-total"><span>应付金额：</span><span class="price-red">¥ {{totalPrice.toFixed(2)}}</span>
      </p>
      <el-button type="warning" v-if="order.status === 0" @click="toPay">立即支付</el-button>
    </div>

    <div class="gray-sub-title cart-title">
      <div class="first">
        <div><span class="order-id">收货信息</span></div>
      </div>
    </div>

    <div style="height: 155px; padding: 20px 30px;">
      <p class="address">姓名：{{order.receiverName}}</p>
      <p class="address">联系电话：{{order.receiverPhone}}</p>
      <p class="address">详细地址：{{order.receiverProvince}} {{order.receiverCity}} {{order.receiverRegion}} {{order.receiverDetailAddress}}</p>
    </div>
  </div>
</template>

<script>
import { countDown } from '@/utils/utils'
export default {
  components: {},
  data () {
    return {
      loading: false,
      order: {},
      orderItemList: [],
      totalPrice: 0,
      time: '00 : 00',
      statusDescriptionText: '',
      step: {
        active: 1,
        items: [
          {
            title: '下单',
            description: ''
          },
          {
            title: '待发货',
            description: ''
          },
          {
            title: '待收货',
            description: ''
          },
          {
            title: '完成交易',
            description: ''
          }
        ]
      }
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    getOrderDetail () {
      this.loading = true
      this.$http({
        url: this.$http.adornUrl(
          '/order/order/getOrderDetail/' + this.$route.query.orderId
        ),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        },
        params: this.$http.adornParams({})
      })
        .then(({ data }) => {
          if (data && data.code === 0) {
            console.log(data.data)
            this.order = data.data.order
            this.orderItemList = data.data.orderItemList
            this.payRemainingTime(this.order.createTime)
            this.getTotalPrice()
            this.$store.commit(
              'user/updateUserMenuTitle',
              '订单号:' + this.order.orderSn
            )
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
    orderStatusText (status) {
      if (status === 0) {
        return '未支付'
      } else if (status === 1) {
        return '待发货'
      } else if (status === 4) {
        return '订单关闭'
      }
    },
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
    getStatusDescriptionText (status) {
      if (status === 0) {
        this.step.active = 1
        return '订单将于' + this.time + '后关闭, 请及时支付!'
      } else if (status === 1) {
        this.step.active = 2
        return '支付成功, 等待发货中'
      } else if (status === 4) {
        this.step.active = 0
        return '订单已关闭'
      }
    },
    getTotalPrice () {
      var total = 0
      this.orderItemList.forEach((item) => {
        total += item.skuPrice * item.skuQuantity
      })
      this.totalPrice = total
    },
    toPay () {
      this.$router.push({ name: 'OrderPay', query: { orderId: this.order.id } })
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
<style src="@/style/css/user/order-detail.css" scoped>
</style>
