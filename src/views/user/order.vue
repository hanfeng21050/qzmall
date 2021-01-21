<template>
  <div class="s_content">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="待支付" v-loading="loading" element-loading-text="加载中" class="tab">
        <order-list @handleCurrentChange="handleCurrentChange" :orderList="orderList" :total="total" :pageSize="pageSize" :currentPage="currentPage"></order-list>
      </el-tab-pane>
      <el-tab-pane label="待发货" v-loading="loading" element-loading-text="加载中" class="tab">
        <order-list @handleCurrentChange="handleCurrentChange" :orderList="orderList" :total="total" :pageSize="pageSize" :currentPage="currentPage"></order-list>
      </el-tab-pane>
      <el-tab-pane label="待收货" v-loading="loading" element-loading-text="加载中" class="tab">
        <order-list @handleCurrentChange="handleCurrentChange" :orderList="orderList" :total="total" :pageSize="pageSize" :currentPage="currentPage"></order-list>
      </el-tab-pane>
       <el-tab-pane label="已完成" v-loading="loading" element-loading-text="加载中" class="tab">
        <order-list @handleCurrentChange="handleCurrentChange" :orderList="orderList" :total="total" :pageSize="pageSize" :currentPage="currentPage"></order-list>
      </el-tab-pane>
      <el-tab-pane label="已取消" v-loading="loading" element-loading-text="加载中" class="tab">
        <order-list @handleCurrentChange="handleCurrentChange" :orderList="orderList" :total="total" :pageSize="pageSize" :currentPage="currentPage"></order-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderList from '../../components/OrderList.vue'
export default {
  components: { OrderList },
  data () {
    return {
      loading: false,
      total: 100,
      pageSize: 6,
      currentPage: 1,
      orderList: [],
      orderStatus: '0'
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
        params: this.$http.adornParams({
          page: this.currentPage,
          limit: this.pageSize,
          status: this.orderStatus
        })
      })
        .then(({ data }) => {
          if (data && data.code === 0) {
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
    },
    tabClick (tab) {
      if (tab.index === '0') {
        this.orderStatus = '0'
      } else if (tab.index === '1') {
        this.orderStatus = '1'
      } else if (tab.index === '2') {
        this.orderStatus = '2'
      } else if (tab.index === '3') {
        this.orderStatus = '3'
      } else if (tab.index === '4') {
        this.orderStatus = '4'
      }
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
