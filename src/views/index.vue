<template>
  <div class="s_content">
    <!-- <div class="carousel">
    </div> -->

    <div class="menu">
      <!-- 三级分类显示 -->
      <ul>
        <li v-for="(cate1) in categoryList" :key="cate1.catId">
          <a herf="javascript:;">{{cate1.name}}</a> <span></span>
          <div class="submenu">
            <div class="subleft">
              <dl v-for="(cate2) in cate1.children" :key="cate2.catId">
                <dt>{{cate2.name}}</dt>
                <dd>
                  <router-link :to="{name: 'ProductList', params: {catelog3Id: cate3.catId}}" v-for="(cate3,index) in cate2.children" :key="cate3.catId +'-'+index">
                    {{cate3.name}}
                  </router-link>
                </dd>
              </dl>
            </div>
          </div>
        </li>
      </ul>
      <!-- 轮播图 -->
      <div class="right">
        <el-carousel class="carousel" height="600px">
          <el-carousel-item v-for="img in advIamges" :key="img.id">
            <img :src="img.pic" @click="goUrl(img.url)" style="cursor: pointer; vertical-align:middle; height:600px; width:968px; border-radius: 8px;object-fit: cover;">
          </el-carousel-item>
        </el-carousel>
      </div>

    </div>

    <div class="subject" v-for="subject in subjects" :key="subject.id">
      <!---->
      <!---->
      <section class="w mt30 clearfix">
        <div class="gray-box">
          <p class="title"><a>{{subject.title}}</a></p>
          <div class="subtitle">
            <p>{{subject.subTitle}}</p>
          </div>
          <div>
            <div class="floors">
              <div class="imgbanner">
                <img @click="goUrl(subject.url)" :src="subject.img" lazy="loaded">
              </div>
              <div class="good-item" v-for="sku in subject.skus" :key="sku.id">
                <div>
                  <div class="good-img"><a><img :src="sku.skuDefaultImg" lazy="loaded"></a></div>
                  <h6 class="good-title ellipsis" :title="sku.skuName">{{sku.skuTitle}}</h6>
                  <h3 class="sub-title ellipsis">{{sku.skuSubtitle}}</h3>
                  <div class="good-price pr">
                    <div class="ds pa">
                      <el-button size="mini" type="danger" class="default-btn" style="margin: 0px 5px;" @click="goSkuDetail(sku.skuId)">查看详情</el-button>
                      <el-button size="mini" type="warning" class="default-btn" style="margin: 0px 5px;" @click="addCart(sku.skuId)">加入购物车</el-button>
                    </div>
                    <p><span style="font-size: 14px;">￥</span>49.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loadding: true,
      count: 0,
      advIamges: [],
      subjects: [],
      categoryList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取分类
    getCategoryList () {
      this.$http({
        url: this.$http.adornUrl('/product/category/list/tree'),
        method: 'get',
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        this.categoryList = data.data
      })
    },

    // 获取去首页广告轮播图
    getHomeAdvList () {
      this.$http({
        url: this.$http.adornUrl('/coupon/homeadv/list'),
        method: 'get',
        params: this.$http.adornParams({
          page: 1,
          limit: 999
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.advIamges = data.page.list
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

    // 获取专题活动信息
    getSubject () {
      this.$http({
        url: this.$http.adornUrl('/coupon/homesubject/getSubject'),
        method: 'get',
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data)
          this.subjects = data.data
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

    // 跳转到广告详情地址
    goUrl (url) {
      window.open(url, '_blank')
    },

    // 跳转到商品详情
    goSkuDetail (skuId) {
      this.$router.push({
        path: '/product/detail',
        query: {
          skuId: skuId
        }
      })
    },

    // 添加到购物车
    addCart (skuId) {
      const token = this.$cookie.get('token')
      if (token === null) {
        this.$notify({
          title: '请先登录!',
          type: 'error',
          duration: 1500
        })
        return
      }
      const data = {
        skuId: skuId,
        count: 1
      }

      this.$http({
        url: this.$http.adornUrl('/product/skuinfo/addcart'),
        method: 'post',
        data: this.$http.adornData(data, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$notify({
            title: '加入购物车成功',
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
    }
  },
  created () {
    this.getCategoryList()
    this.getHomeAdvList()
    this.getSubject()
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

<style src="../style/css/index.css" scoped>
</style>
