<template>
  <div class="s_content">
    <div class="s_content_c inner_c">
      <!-- 导航条 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="nav_bar">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数码</el-breadcrumb-item>
        <el-breadcrumb-item>手机</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 商品筛选 -->
      <div class="banner">
        <div class="nav">
          <div class="selector">
            <div class="title">
              <h3><b>手机</b><em>商品筛选</em></h3>
            </div>

            <div class="condition">
              <!--品牌-->
              <div class="JD_pre">
                <div class="sl_key">
                  <span>品牌：</span>
                </div>
                <div class="sl_value">
                  <ul>
                    <li v-for="brand in brands" :key="brand.brandId"><a href="#">{{brand.brandName}}</a></li>
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
                    <li v-for="catalog in catalogs" :key="catalog.catalogId"><a href="#">{{catalog.catalogName}}</a></li>
                  </ul>
                </div>
              </div>

              <div class="JD_pre" v-for="attr in attrs" :key=attr.attrId>
                <div class="sl_key">
                  <span>{{attr.attrName}}：</span>
                </div>
                <div class="sl_value">
                  <ul>
                    <li v-for="(val, index) in attr.attrValueList" :key="index"><a href="#">{{val}}</a></li>
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
          <a href="#" class="s1">
            <i></i>销量
          </a>
          <a href="#" class="s2">
            <i></i>价格
          </a>
          <a href="#" class="s3">
            <i></i>上架时间
          </a>
        </div>
        <div class="swi">
          <span>仅显示有货：</span>
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="total">
          共<span>{{total}}</span>个商品
        </div>
      </div>
      <div class="s_prod" v-loading="loading">
        <product-item v-for="spu in spuList" :key="spu.spuId" :spu="spu"></product-item>
      </div>

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total" style="text-align:right" :current-page="pageNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import ProductItem from '@/components/ProductItem'
export default {
  components: { ProductItem },
  data () {
    return {
      loading: false,
      value: false,
      pageNum: 1,
      pageSize: 16,
      total: 1000,
      brands: [],
      catalogs: [],
      attrs: [],
      spuList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getSpuList () {
      this.$http({
        url: this.$http.adornUrl('/product/spuinfo/spuList'),
        method: 'get',
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        console.log(data)
        if (data.code === 0) {
          this.$notify({
            title: '获取数据成功',
            type: 'success'
          })
          const _data = data.page
          this.pageNum = _data.currentPage
          this.total = _data.totalCount
          this.brands = _data.list[0].brands
          this.catalogs = _data.list[0].catalogs
          this.attrs = _data.list[0].attrs
          this.spuList = _data.list[0].spuList
        } else {
          this.$notify({
            title: '获取数据失败',
            type: 'error'
          })
        }
      })
      this.loading = false
    }
  },
  created () {
    this.loading = true
    this.getSpuList()
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
<style src="../style/css/product-list.css">
</style>
