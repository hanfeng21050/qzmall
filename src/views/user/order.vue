<template>
  <div class="s_content">
    <el-tabs type="border-card">
      <el-tab-pane label="全部订单" v-loading="loading" element-loading-text="加载中" class="tab">
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
                        <div class="p-name"><a class="a-link" clstag="click|keycount|orderinfo|order_product" target="_blank" :title="orderItem.skuName">
                            {{orderItem.skuName}}
                          </a>
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
                    <div class="status" v-if="order.order.status !== 0">
                      <span class="order-status ftx-02">
                        等待收货
                      </span>
                      <br>
                      <router-link to="/user/orderDetail">订单详情</router-link>
                    </div>
                    <div class="status" v-else>
                      <span class="order-status ftx-02" style="color: gray">
                        待支付
                      </span>
                      <br>
                      <router-link to="/user/orderDetail">订单详情</router-link>
                    </div>
                  </td>
                  <td :rowspan="order.orderItemList.length" v-if="index===0" width="15%">
                    <div class="operate" v-if="order.order.status!== 0">
                      <a href="#none" class="btn-5 order-confirm">确认收货</a><br>
                      <a class="a-link order-cancel" href="javascript:void(0);">取消订单</a><br>
                    </div>
                    <div class="operate" v-else>
                      <router-link class="btn-5 order-confirm" :to="{path: '/orderpay',query: { orderId: order.order.id }}">去支付</router-link>
                      <br>
                      <a class="a-link order-cancel" href="javascript:void(0);">取消订单</a><br>
                    </div>
                  </td>
                </tr>
              </template>
            </template>

          </tbody>
        </table>
        <el-pagination background layout="prev, pager, next" :total="total" :pageSize="pageSize" @current-change="handleCurrentChange" style="text-align:right;margin-top:10px">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="待发货">待发货</el-tab-pane>
      <el-tab-pane label="待收货">待收货</el-tab-pane>
      <el-tab-pane label="待评价">待评价</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      loading: false,
      total: 100,
      pageSize: 6,
      currentPage: 1,
      orderList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getOrderList () {
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/order/order/listByMemberId'),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        },
        params: this.$http.adornParams({
          page: this.currentPage,
          limit: this.pageSize
        })
      })
        .then(({ data }) => {
          if (data && data.code === 0) {
            console.log(data)
            this.total = data.page.totalCount
            this.orderList = data.page.list
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
    handleCurrentChange (val) {
      this.currentPage = val
      this.getOrderList()
    }
  },
  created () {
    this.getOrderList()
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
