<template>
  <div class="s_content">
    <div class="s_content_c inner_c">
      <!-- 导航条 -->
      <div class="nav_bar">
        <div class="nav_bar_one a">
          <a href="#">手机</a>
        </div>
        <i><img src="../style/img/right-@1x.png" alt=""></i>
        <div class="nav_bar_one b">
          <a href="#" class="qqq">手机通讯录 <img src="../style/img/down-@1x.png" alt=""></a>
          <div>
            <a href="#">手机通讯</a>
            <a href="#">运营商</a>
            <a href="#">手机配件</a>
            <a href="#">手机服务</a>
          </div>
        </div>
        <i><img src="../style/img/right-@1x.png" alt=""></i>
        <div class="nav_bar_one c">
          <a href="#" class="qqq">手机 <img src="../style/img/down-@1x.png" alt=""></a>
          <div>
            <a href="#">手机</a>
            <a href="#">老人机</a>
            <a href="#">对讲机</a>
            <a href="#">女性手机</a>
            <a href="#">超续航手机</a>
            <a href="#">全面屏手机</a>
            <a href="#">拍照手机</a>
            <a href="#">游戏手机</a>
          </div>
        </div>

      </div>

      <!-- 商品筛选 -->
      <div class="banner">
        <div class="nav">
          <div class="selector">
            <div class="title">
              <h3><b>手机</b><em>商品筛选</em></h3>
              <div class="st-ext">共&nbsp;<span>10135</span>个商品 </div>
            </div>

            <div class="condition">
              <!--价格-->
              <div class="JD_pre">
                <div class="sl_key">
                  <span>品牌：</span>
                </div>
                <div class="sl_value">
                  <ul>
                    <li><a href="#">小米</a></li>
                    <li><a href="#">华为</a></li>
                    <li><a href="#">苹果</a></li>
                    <li><a href="#">vivo</a></li>
                    <li><a href="#">oppo</a></li>
                    <li><a href="#">1+</a></li>
                    <li><a href="#">三星</a></li>
                  </ul>
                </div>
              </div>

              <div class="JD_pre">
                <div class="sl_key">
                  <span>价格：</span>
                </div>
                <div class="sl_value">
                  <ul>
                    <li><a href="#">0-499</a></li>
                    <li><a href="#">500-999</a></li>
                    <li><a href="#">1000-1699</a></li>
                    <li><a href="#">1700-2799</a></li>
                    <li><a href="#">2800-4499</a></li>
                    <li><a href="#">4500-11999</a></li>
                    <li><a href="#">12000以上</a></li>
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
          <!--<a href="#">
              <i></i>
            </a> -->
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="total">
          共<span>20</span>个商品
        </div>
      </div>
      <div class="s_prod">
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
        <product-item></product-item>
      </div>

      <el-pagination background layout="prev, pager, next" :total="1000" style="text-align:right">
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
      value: false
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
