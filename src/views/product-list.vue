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
                    <li v-for="(val, index) in attr.attrValues" :key="index"><a href="#">{{val}}</a></li>
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
      <div class="s_prod" v-loading="loading" >
        <product-item v-for="spu in spuList" :key="spu.spuId" :spu="spu"></product-item>
      </div>

      <el-pagination background layout="prev, pager, next" :page-size="20" :total="total" style="text-align:right" :current-page="pageNum">
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
      total: 1000,
      brands: [
        {
          brandId: 1,
          brandName: '华为'
        },
        {
          brandId: 2,
          brandName: '小米'
        },
        {
          brandId: 3,
          brandName: '苹果'
        },
        {
          brandId: 4,
          brandName: 'vivo'
        },
        {
          brandId: 5,
          brandName: 'oppo'
        }
      ],
      catalogs: [
        {
          catalogId: 1,
          catalogName: '手机'
        },
        {
          catalogId: 2,
          catalogName: '智能手表'
        },
        {
          catalogId: 3,
          catalogName: '智能手环'
        }
      ],
      attrs: [
        {
          attrId: 1,
          attrName: '尺寸',
          attrValues: ['1寸', '2寸', '三寸']
        },
        {
          attrId: 2,
          attrName: '颜色',
          attrValues: ['红色', '黑色', '蓝色']
        }
      ],
      spuList: [
        {
          spuId: 1,
          spuName: '华为 mate30',
          skuList: [
            {
              skuId: 1,
              skuName: '华为mate30 8+128',
              skuPrice: 6999.0,
              skuImg: require('../style/img/58d1d078N20e18b62.jpg'),
              saleCount: 0,
              hasStock: 1
            },
            {
              skuId: 2,
              skuName: '华为mate30 12+128',
              skuPrice: 5999.0,
              skuImg: require('../style/img/57d0d400nfd249af4.jpg'),
              saleCount: 0,
              hasStock: 1
            },
            {
              skuId: 3,
              skuName: '华为mate30 8+256',
              skuPrice: 4999.0,
              skuImg: require('../style/img/57d11c33N5cd57490.jpg'),
              saleCount: 0,
              hasStock: 1
            }
          ]
        },
        {
          spuId: 2,
          spuName: '华为 mate30',
          skuList: [
            {
              skuId: 4,
              skuName: '华为mate30 8+128',
              skuPrice: 6999.0,
              skuImg: require('../style/img/58d1d078N20e18b62.jpg'),
              saleCount: 0,
              hasStock: 1
            },
            {
              skuId: 5,
              skuName: '华为mate30 12+128',
              skuPrice: 5999.0,
              skuImg: require('../style/img/57d0d400nfd249af4.jpg'),
              saleCount: 0,
              hasStock: 1
            },
            {
              skuId: 6,
              skuName: '华为mate30 8+256',
              skuPrice: 4999.0,
              skuImg: require('../style/img/57d11c33N5cd57490.jpg'),
              saleCount: 0,
              hasStock: 1
            }
          ]
        },
        {
          spuId: 3,
          spuName: '华为 mate30',
          skuList: [
            {
              skuId: 7,
              skuName: '华为mate30 8+128',
              skuPrice: 6999.0,
              skuImg: require('../style/img/58d1d078N20e18b62.jpg'),
              saleCount: 0,
              hasStock: 1
            },
            {
              skuId: 8,
              skuName: '华为mate30 12+128',
              skuPrice: 5999.0,
              skuImg: require('../style/img/57d0d400nfd249af4.jpg'),
              saleCount: 0,
              hasStock: 1
            },
            {
              skuId: 9,
              skuName: '华为mate30 8+256',
              skuPrice: 4999.0,
              skuImg: require('../style/img/57d11c33N5cd57490.jpg'),
              saleCount: 0,
              hasStock: 1
            }
          ]
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
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
