<template>
  <div class="s_content">
    <div class="wrapper">
      <div class="blocks-content box1">
        <div class="grid-container">
          <div class="blocks-text">
            <h1 style="text-align: center; color: rgb(92, 124, 75);" data-forecolor="#5C7C4B">{{shop.shopName}}</h1>
            <p style="text-align: center; color: rgb(41, 46, 40);" data-forecolor="#292E28">{{shop.shopNotice}}</p>
          </div>
        </div>
      </div>

      <div class="blocks-content box2">
        <div class="grid-container">
          <div class="blocks-text">
            <p style="text-align: center; font-family: Josefin Sans,sans-serif; color: rgb(180, 180, 180);" data-font-id="46" data-forecolor="#b4b4b4"><i>THE LATEST PRODUCTS<br></i></p>
            <h4 style="text-align: center; color: rgb(92, 124, 75);" data-forecolor="#5C7C4B">水&nbsp; 果&nbsp; 店&nbsp; 最&nbsp; 新&nbsp; 产&nbsp; 品</h4>
          </div>
        </div>
      </div>

      <div class="blocks-content box3" v-loading="loading">
        <product-item v-for="sku in products" :key="sku.skuId" :sku="sku"></product-item>
      </div>

      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="params.limit" :total="total" style="text-align:right" :current-page="params.page">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem'
export default {
  components: {
    ProductItem
  },
  data () {
    return {
      loading: false,
      shop: {},
      products: [],
      total: 0,
      params: {
        shopId: '',
        page: 1,
        limit: 12
      }
    }
  },
  methods: {
    getShopInfo () {
      this.$http({
        url: this.$http.adornUrl('/shop/shop/info/' + this.params.shopId),
        method: 'get',
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          this.shop = data.shop
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
    getProdtctList () {
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/product/skuinfo/list'),
        method: 'get',
        params: this.$http.adornParams(this.params)
      }).then(({ data }) => {
        this.total = data.page.totalCount
        this.products = data.page.list
      },
      (error) => {
        this.$notify({
          title: error.message,
          type: 'error'
        })
      }
      ).finally(() => {
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.params.page = val
      this.getProdtctList()
    }
  },
  created () {
    const shopId = this.$route.query.shopId
    this.params.shopId = shopId
    this.getShopInfo()
    this.getProdtctList()
  }
}
</script>
<style src="../style/css/store.css" scoped>
</style>
