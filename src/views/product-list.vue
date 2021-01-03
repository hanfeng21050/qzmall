<template>
  <div class="s_content">
    <div class="s_content_c inner_c">
      <!-- 导航条 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="nav_bar">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 商品筛选 -->
      <div class="banner">
        <div class="nav">
          <div class="selector">
            <div class="title">
              <h3><b>全部结果></b></h3>
              <div class="label">
                <span class="tag" v-for="(tag, index) in selectTags" :key="index">
                  <span class="span-text">{{tag.name}}:{{tag.flag === 2 ? tag.value.split("_")[1] : tag.value}}</span>
                  <div class="tag-remove" @click="deleteTag(tag)">X</div>
                </span>
              </div>
            </div>

            <div class="condition">
              <!--品牌-->
              <div class="JD_pre">
                <div class="sl_key">
                  <span>品牌：</span>
                </div>
                <div class="sl_value">
                  <ul>
                    <li v-for="brand in brands" :key="brand.brandId" @click="brandCick(brand.brandId, brand.brandName, 0)"><a>{{brand.brandName}}</a></li>
                  </ul>
                </div>
              </div>
              <!-- 分类 -->
              <div class="JD_pre">
                <div class="sl_key">
                  <span>分类：</span>
                </div>
                <div class="sl_value">
                  <ul>
                    <li v-for="catalog in catalogs" :key="catalog.catalogId" @click="catalogClick(catalog.catalogId, catalog.catalogName, 0)"><a>{{catalog.catalogName}}</a></li>
                  </ul>
                </div>
              </div>

              <div class="JD_pre" v-for="attr in attrs" :key="attr.attrId">
                <div class="sl_key">
                  <span>{{attr.attrName}}：</span>
                </div>
                <div class="sl_value">
                  <ul>
                    <li v-for="(val, index) in attr.attrValue" :key="index" @click="attrClick(attr.attrId, attr.attrName, val)"><a>{{val}}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="fun">
        <div class="sort">
          <span>排序：</span>
          <el-button @click="sort('upTime')" size="small" type="warning" style="height:35px;font-size:13px" plain>上架时间<i :class="params.sort && params.sort.split('_')[0] === 'upTime' && params.sort.split('_')[1] === 'asc' ? 'el-icon-top el-icon--right':'el-icon-bottom el-icon--right'"/></el-button>
          <el-button @click="sort('saleCount')" size="small" type="warning" style="height:35px; font-size:13px" plain>销量<i :class="params.sort && params.sort.split('_')[0] === 'saleCount' && params.sort.split('_')[1] === 'asc' ? 'el-icon-top el-icon--right':'el-icon-bottom el-icon--right'"/></el-button>
          <el-button @click="sort('skuPrice')" size="small" type="warning" style="height:35px; font-size:13px" plain>价格<i :class="params.sort && params.sort.split('_')[0] === 'skuPrice' && params.sort.split('_')[1] === 'asc' ? 'el-icon-top el-icon--right':'el-icon-bottom el-icon--right'"/></el-button>
        </div>

        <div class="price">
          <span>价格：</span>
          <a><el-input v-model="priceLow" style="width:90px" size="small" clearable></el-input></a>
          --
          <a><el-input v-model="priceHigh" style="width:90px" size="small" clearable></el-input></a>

          <el-button type="warning" plain size="small" style="margin:0 20px" @click="getProdtctList()">查询</el-button>
        </div>
        <div class="swi">
          <span>仅显示有货：</span>
          <el-switch @change="changeSwitch" v-model="params.hasStock" active-value="1" inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="total">
          共<span>{{total}}</span>个商品
        </div>
      </div>
      <div class="s_prod" v-loading="loading">
        <product-item v-for="sku in products" :key="sku.skuId" :sku="sku"></product-item>
      </div>
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="text-align:right" :current-page="pageNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import ProductItem from '@/components/ProductItem'
import { omit } from '@/utils/utils'
export default {
  components: { ProductItem },
  data () {
    return {
      loading: false,
      pageNum: 1,
      pageSize: 16,
      total: 1000,
      brands: [],
      catalogs: [],
      attrs: [],
      spuList: [],
      products: [],
      /* 已选择的筛选条件 */
      selectTags: [],
      // 0:desc 1: asc
      sortType: false,
      priceLow: '',
      priceHigh: '',
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
  computed: {
    skuPrice: function () {
      let price = ''
      if (this.priceLow || this.priceHigh) {
        if (this.priceLow.trim() === '') {
          price = '_' + this.priceHigh
        } else if (this.priceHigh.trim() === '') {
          price = this.priceLow + '_'
        } else {
          price = this.priceLow + '_' + this.priceHigh
        }
      }
      return price
    }
  },
  watch: {
    // 监控路由变化
    $route (to, from) {
      this.selectTags = []
      this.params = {
        keyword: to.query.keyword,
        pageNum: 1,
        pageSize: 16,
        brandId: [],
        attrs: [],
        hasStock: ''
      }
      this.getProdtctList()
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
            this.pageNum = _data.pageNum
            this.total = _data.total
            this.brands = _data.brands
            this.catalogs = _data.catalogs
            this.attrs = _data.attrs
            this.products = _data.products
            /*  this.spuList = _data.list[0].spuList */
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
    },

    handleCurrentChange (val) {
      this.params.pageNum = val
      this.getProdtctList()
    },

    brandCick (id, name) {
      /* 防止重复点击 */
      if (this.params.brandId.findIndex((_id) => _id === id) !== -1) {
        return
      }

      const tag = {
        flag: 0,
        name: '品牌',
        value: name
      }
      this.selectTags.push(tag)
      this.params.brandId.push(id)
      this.getProdtctList()
    },

    catalogClick (id, name) {
      /* 防止重复点击 */
      if (this.params.catalog3Id) {
        return
      }
      const tag = {
        flag: 1,
        name: '分类',
        value: name
      }
      this.selectTags.push(tag)
      this.params.catalog3Id = id
      this.getProdtctList()
    },
    /** 排序 */
    sort (val) {
      this.params.sort = val + (this.sortType ? '_desc' : '_asc')
      this.sortType = !this.sortType

      this.getProdtctList()
    },
    /**
     * id: 自定义属性id
     * name: 自定义属性名
     * value: 自定义属性值
     */
    attrClick (id, name, value) {
      /* 防止重复点击 */
      if (
        this.params.attrs.findIndex((val) => val === id + '_' + value) !== -1
      ) {
        return
      }

      const tag = {
        flag: 2,
        name: name,
        value: id + '_' + value
      }
      this.selectTags.push(tag)
      this.params.attrs.push(id + '_' + value)
      this.getProdtctList()
    },
    /*
      flag = 0 表示品牌
      flag = 1 表示分类
      flag = 2 表示属性
    */
    deleteTag (tag) {
      this.selectTags.splice(
        this.selectTags.findIndex(
          (item) => item.name === tag.name && item.value === tag.value
        ),
        1
      )
      if (tag.flag === 0) {
        this.params.brandId.splice(
          this.params.brandId.findIndex((item) => item === tag.value),
          1
        )
      } else if (tag.flag === 1) {
        this.params = omit(this.params, ['catalog3Id'])
      } else if (tag.flag === 2) {
        this.params.attrs.splice((val) => val === tag.value)
      }
      this.getProdtctList()
    },
    changeSwitch () {
      this.getProdtctList()
    }
  },
  created () {
    this.params.keyword = this.$route.query.keyword
    var catelog3Id = this.$route.params.catelog3Id
    if (catelog3Id && catelog3Id !== '') {
      this.params.catalog3Id = catelog3Id
      this.$http({
        url: this.$http.adornUrl('/product/category/info/' + catelog3Id),
        method: 'get',
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        if (data && data.code === 0) {
          const tag = {
            flag: 1,
            name: '分类',
            value: data.category.name
          }
          this.selectTags.push(tag)
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

    this.getProdtctList()
  },
  mounted () {
    /* 导航条 */
    $('.nav_bar_one').hover(
      function () {
        $(this).children('div').css({ display: 'block' })
      },
      function () {
        $(this).children('div').css({ display: 'none' })
      }
    )
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style src="../style/css/product-list.css" scoped>
</style>
