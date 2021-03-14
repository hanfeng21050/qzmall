<template>
  <div class="s_content">
    <div class="wrapper">
      <div class="blocks-content box1">
        <div class="grid-container">
          <div class="blocks-text">
            <h1 style="text-align: center; color: rgb(92, 124, 75);" data-forecolor="#5C7C4B">水果店</h1>
            <p style="text-align: center; color: rgb(41, 46, 40);" data-forecolor="#292E28">这是一个店铺模板</p>
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
      products: [],
      params: {
        keyword: '',
        pageNum: 1,
        pageSize: 16,
        catelog3Id: '',
        brandId: [],
        attrs: [],
        hasStock: '0',
        sort: 'upTime_desc',
        skuPrice: ''
      }
    }
  },
  methods: {
    getProdtctList () {
      this.loading = true
      this.params.skuPrice = this.skuPrice
      this.$http({
        url: this.$http.adornUrl('/search/search'),
        method: 'get',
        params: this.$http.adornParams(this.params)
      }).then(
        ({ data }) => {
          if (data.code === 0) {
            const _data = data.data
            this.products = _data.products
            /*  this.spuList = _data.list[0].spuList */
            console.log(data)
          } else {
            this.$notify({
              title: data.code,
              message: data.msg,
              type: 'error'
            })
          }
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
    }
  },
  created () {
    this.getProdtctList()
  }
}
</script>
<style src="../style/css/store.css" scoped>
</style>
