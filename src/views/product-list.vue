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
              <h3><b>全部结果></b></h3>
              <div class="label">
                <span class="tag" v-for="(tag, index) in selectTags" :key="index">
                  <span class="span-text">{{tag.name}}:{{tag.flag === 2 ? tag.value.split("_")[1] : tag.value}}</span>
                  <button class="tag-remove" @click="deleteTag(tag)">X</button>
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

              <div class="JD_pre" v-for="attr in attrs" :key=attr.attrId>
                <div class="sl_key">
                  <span>{{attr.attrName}}：</span>
                </div>
                <div class="sl_value">
                  <ul>
                    <li v-for="(val, index) in attr.attrValueList" :key="index" @click="attrClick(attr.attrId, attr.attrName, val)"><a>{{val}}</a></li>
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
import { omit } from '@/utils/utils'
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
      spuList: [],
      /* 已选择的筛选条件 */
      selectTags: [],
      params: {
        spuName: '',
        pageNum: 1,
        pageSize: 16,
        brandId: [],
        attrs: []
      }
    }
  },
  computed: {},
  watch: {
    // 监控路由变化
    $route (to, from) {
      this.selectTags = []
      this.params = {
        spuName: to.query.spuName,
        pageNum: 1,
        pageSize: 16,
        brandId: [],
        attrs: []
      }
      this.getSpuList()
    }
  },
  methods: {
    getSpuList () {
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/product/spuinfo/spuList'),
        method: 'get',
        params: this.$http.adornParams(this.params)
      }).then(
        ({ data }) => {
          console.log(data)
          if (data.code === 0) {
            this.$notify({
              title: '获取数据成功',
              type: 'success',
              duration: 1500
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
              title: data.code,
              message: data.msg,
              type: 'error'
            })
          }
          this.loading = false
        },
        (error) => {
          this.$notify({
            title: error.message,
            type: 'error'
          })
          this.loading = false
        }

      )
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
      this.getSpuList()
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
      this.getSpuList()
    },
    /**
     * id: 自定义属性id
     * name: 自定义属性名
     * value: 自定义属性值
     */
    attrClick (id, name, value) {
      /* 防止重复点击 */
      if (this.params.attrs.findIndex((val) => val === id + '_' + value) !== -1) {
        return
      }

      const tag = {
        flag: 2,
        name: name,
        value: id + '_' + value
      }
      this.selectTags.push(tag)
      this.params.attrs.push(id + '_' + value)
      this.getSpuList()
    },
    /*
      flag = 0 表示品牌
      flag = 1 表示分类
      flag = 2 表示属性
    */
    deleteTag (tag) {
      this.selectTags.splice(
        this.selectTags.findIndex((item) => item.name === tag.name && item.value === tag.value), 1
      )
      if (tag.flag === 0) {
        this.params.brandId.splice(this.params.brandId.findIndex((item) => item === tag.value), 1)
      } else if (tag.flag === 1) {
        this.params = omit(this.params, ['catalog3Id'])
      } else if (tag.flag === 2) {
        this.params.attrs.splice((val) => val === tag.value)
      }
      this.getSpuList()
    }
  },
  created () {
    this.params.spuName = this.$route.query.spuName
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
