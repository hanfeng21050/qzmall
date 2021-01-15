<template>
  <div v-loading="loading">
    <table class="td-void order-tb">
      <thead>
        <tr>
          <th>
            订单详情
          </th>
          <th>收货人</th>
          <th>金额</th>
          <th>
            <div class="deal-state-cont" id="orderState">
              <div class="state-txt">全部状态<b></b><span class="blank"></span></div>
            </div>
          </th>
          <th>操作</th>
        </tr>

      </thead>
      <tbody>
        <template v-for="order in orderList">
          <tr class="sep-row" :key="order.id">
            <td colspan="5"></td>
          </tr>
          <tr class="tr-th" :key="order.id">
            <td colspan="5">
              <span class="gap"></span>
              <span class="dealtime">{{order.order.createTime}}</span>
              <span class="number">
                订单号：
                <a name="orderIdLinks" target="_blank">{{order.order.orderSn}}</a>
              </span>
            </td>
          </tr>
          <template v-for="(orderItem, index) in order.orderItemList">
            <tr class="tr-bd" :key="orderItem.id">
              <td width="40%">
                <div class="goods-item">
                  <div class="p-img">
                    <a clstag="click|keycount|orderinfo|order_product" target="_blank">
                      <img class="" :src="orderItem.skuPic" :title="orderItem.skuName" data-lazy-img="done" width="60" height="60">
                    </a>
                  </div>
                  <div class="p-msg">
                    <div class="p-name">
                      <router-link class="a-link" :to="{name: 'ProductDetail', query: {skuId: orderItem.skuId}}" :title="orderItem.skuName">{{orderItem.skuName}} </router-link>
                    </div>

                  </div>
                  <p class="goods-number">
                    x{{orderItem.skuQuantity}}
                  </p>
                </div>
                <div class="clr"></div>
              </td>
              <td :rowspan="order.orderItemList.length" v-if="index===0" width="15%">
                <div class="consignee tooltip">
                  <span class="txt">{{order.order.receiverName}}</span><b></b>
                  <div class="prompt-01 prompt-02">
                    <div class="pc">
                      <strong>{{order.order.receiverName}}</strong>
                      <p>{{order.order.receiverProvince}} {{order.order.receiverCity}} {{order.order.receiverRegion}} {{order.order.receiverDetailAddress}}</p>
                      <p>{{order.order.receiverPhone}}</p>
                    </div>
                    <div class="p-arrow p-arrow-left"></div>
                  </div>
                </div>
              </td>
              <td :rowspan="order.orderItemList.length" v-if="index===0" width="15%">
                <div class="amount">
                  <span>¥{{order.order.payAmount.toFixed(2)}}</span> <br>
                  <span class="ftx-13">在线支付</span>
                </div>
              </td>
              <td :rowspan="order.orderItemList.length" v-if="index===0" width="15%">
                <div class="status">
                  <span class="order-status ftx-02" style="color: gray">
                    {{getOrderStatus(order.order.status)}}
                  </span>
                  <br>
                  <router-link :to="{name: 'OrderDetail', query: {orderId: order.order.id}}">订单详情</router-link>
                </div>
              </td>
              <td :rowspan="order.orderItemList.length" v-if="index===0" width="15%">
                <div class="operate" v-if="order.order.status=== 0">
                  <router-link class="btn-5 order-confirm" :to="{name: 'OrderPay',query: { orderId: order.order.id }}">去支付</router-link>
                  <br>
                  <a class="a-link order-cancel" @click="closeOrder(order.order.id)">取消订单</a><br>
                </div>
                <div class="operate" v-else-if="order.order.status=== 1">
                  <a class="btn-5 order-confirm" @click="deliverOrder(order.order.id)">提醒发货</a>
                </div>
                <div class="operate" v-else-if="order.order.status=== 2">
                  <a class="btn-5 order-confirm" @click="receiveOrder(order.order.id)">确认收货</a>
                </div>
                <div class="operate" v-else-if="order.order.status=== 3">
                   <a class="btn-5 order-confirm" @click="commentOrder(order.order.id)">去评价</a>
                </div>
                <div class="operate" v-else>
                   <span class="order-cancel">已取消</span><br>
                </div>
              </td>
            </tr>
          </template>
        </template>

      </tbody>
    </table>
    <el-pagination background layout="prev, pager, next" :total="total" :pageSize="pageSize" @current-change="handleCurrentChange" style="text-align:right;margin-top:10px">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    orderList: Array,
    total: Number,
    pageSize: Number,
    currentPage: Number
  },
  components: {},
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    },
    getOrderList () {
      this.$emit('getOrderList')
    },
    getOrderStatus (staus) {
      var statusText = ''
      if (staus === 0) {
        statusText = '待支付'
      } else if (staus === 1) {
        statusText = '待发货'
      } else if (staus === 2) {
        statusText = '已发货'
      } else if (staus === 3) {
        statusText = '已完成'
      } else if (staus === 4) {
        statusText = '已关闭'
      } else {
        statusText = '无效订单'
      }
      return statusText
    },
    closeOrder (id) {
      this.$confirm('此操作会取消当前订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.$http({
            url: this.$http.adornUrl('/order/order/closeOrder/' + id),
            method: 'get',
            headers: {
              token: this.$cookie.get('token')
            },
            params: this.$http.adornParams({})
          })
            .then(({ data }) => {
              if (data && data.code === 0) {
                this.$notify({
                  title: '取消订单成功',
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
            .finally(() => {
              this.loading = false
            })
        })
        .catch(() => {})
    },
    receiveOrder (id) {
      if (!id) {
        return
      }
      this.$confirm('是否确认收货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.$http({
            url: this.$http.adornUrl('/order/order/receiveOrder/' + id),
            headers: {
              token: this.$cookie.get('token')
            },
            method: 'post'
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$notify({
                title: '收货成功',
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
          }).finally(() => {
            this.loading = false
          })
        })
        .catch(() => {})
    },
    commentOrder (id) {
      this.$notify({
        title: '功能开发中,敬请期待',
        type: 'error',
        duration: 1500
      })
    },
    deliverOrder (id) {
      this.$notify({
        title: '提醒成功',
        type: 'success',
        duration: 1500
      })
    }
  },
  created () {
    this.$store.commit('user/updateUserMenuTitle', '我的订单')
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
<style src="@/style/css/user/order.css" scoped>
</style>
