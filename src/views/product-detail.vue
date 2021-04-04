<template>
  <div class="s_content">
    <div class="detail-body">
      <el-backtop></el-backtop>
      <el-breadcrumb class="crumb-wrap" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="">
        <div class="box">
          <div class="boxx">
            <div class="imgbox">
              <div class="probox">
                <el-image class="img1" :src="sku.skuDefaultImg" :preview-src-list="imgList" :z-index="9999" />
              </div>
            </div>
            <div class="box-thumb">
              <swiper class="swiper" ref="mySwiper" :options="swiperOption">
                <swiper-slide class="swiper-slide" v-for="(img, index) in images" :key="img.id">
                  <el-image class="thumb" @mouseenter="mouseenter(index)" :src="img.imgUrl" :style="imgHover === index ? 'border:1px solid #c78a49' : ''" />
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="box-two">
            <div class="box-name">
              {{sku.skuTitle}}
            </div>
            <div class="box-hide">{{sku.skuSubtitle}}</div>
            <div class="box-summary clear">
              <ul>
                <li>售价</li>
                <li>
                  <span>￥</span>
                  <span>{{formatMoney(this.sku.price)}}</span>
                </li>
                <li>
                  降价通知
                </li>
              </ul>
            </div>
            <div class="box-attr-3">
              <div>

              </div>
              <single-selector v-for="(attr, index) in saleAttrs" :key="index" :attr="attr" :skuId="sku.skuId" @attrClick="attrClick" :ref="'item'+ index" />
            </div>
            <div class="box-btns clear">
              <div class="box-btns-one">
                <el-input-number v-model="count" controls-position="right" :min="1" :max="999"></el-input-number>
              </div>
              <el-button type="warning" icon="iconfont icon-commodity" @click="addToCart"> 加入购物车</el-button>
              <el-button type="danger" icon="iconfont icon-like_fill" @click="collect"> 收藏</el-button>
            </div>

            <div id="summary-tips" class="summary-tips">
              <div class="dt">温馨提示</div>
              <div class="dd">
                <ol class="tips-list">
                  <li class="local-txt">·7天无理由退货</li>
                </ol>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="w">
        <!-- 侧边栏 -->
        <div class="aside">
          <div class="mt">
            <h4>某某旗舰店</h4>
          </div>
          <div class="mc store">
            <el-button size="small" icon="iconfont icon-workbench_fill" @click="$router.push({name: 'Shop', query: {shopId: sku.shopId}})">进店逛逛</el-button>
            <el-button size="small" icon="iconfont icon-collection_fill">关注店铺</el-button>
          </div>
          <div class="mt">
            <h4>选购达人</h4>
          </div>
          <div class="mc">
            <ul class="plist">
              <li>
                <a><img src="https://coolmall-oss.oss-cn-hangzhou.aliyuncs.com/2020-12-27/7af293d5-bdf7-4c24-8b18-965d1d91f508_主图-02.jpg"></a>
                <p>
                  <a>AppleAirPods Max 银色 官方AppleCare+版</a>
                </p>
                <p><strong class="J-p-20015341974">￥4878.00</strong></p>
              </li>
              <li>
                <a><img src="https://coolmall-oss.oss-cn-hangzhou.aliyuncs.com/2020-12-27/b02f1fe9-657c-401c-80ed-184a3c9329da_主图-02.jpg"></a>
                <p>
                  <a>AppleAirPods Max 粉色 官方AppleCare+版</a>
                </p>
                <p><strong class="J-p-20015341974">￥4878.00</strong></p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品详情 -->
        <el-tabs type="border-card" class="detail" @tab-click="tabClick">
          <el-tab-pane label="商品介绍">
            <div class="tab-con">
              <ul>
                <li>
                  <div class="jieshao">
                    <img v-for="(img, index) in descImgList" class="xiaoguo" :src="img" :key="index">
                  </div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="规格与包装">
            <div class="guiGebox">
              <div class="guiGe" v-for="(group, index) in groupAttrs" :key="index">
                <h3>{{group.groupName}}</h3>
                <dl>
                  <div v-for="attr in group.attrs" :key="attr.attrId">
                    <dt>{{attr.attrName}}</dt>
                    <dd>{{attr.attrValue}}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="售后保障">
            <div class="oBox">
              <div class="after-sale-title-item">
                <span class="oImg">
                  <h3>厂家服务</h3>
                </span>
                <div class="wenZi">
                  本产品全国联保，享受三包服务，质保期为：一年保<br>
                  如因质量问题或故障，凭厂商维修中心或特约维修点的质量检测证明，享受7日内退货，15日内换货，15日以上在保质期内享受免费保修等安保服务！<br>
                  (注：如厂家在商品介绍中有售后保障的说明，则此商品按照厂家说明执行售后保障服务。)您可以查询本品牌在各地售后服务中心的联系方式<br>
                </div>
              </div>
              <div class="after-sale-title-item">
                <span class="oImg">
                  <h3>平台承诺</h3>
                </span>
                <div class="wenZi">
                  本产品全国联保，享受三包服务，质保期为：一年保<br>
                  如因质量问题或故障，凭厂商维修中心或特约维修点的质量检测证明，享受7日内退货，15日内换货，15日以上在保质期内享受免费保修等安保服务！<br>
                  (注：如厂家在商品介绍中有售后保障的说明，则此商品按照厂家说明执行售后保障服务。)您可以查询本品牌在各地售后服务中心的联系方式<br>
                </div>
              </div>
              <div class="after-sale-title-item">
                <span class="oImg">
                  <h3>正品行货</h3>
                </span>
                <div class="wenZi">
                  京东商城向您保证所售商品均为正品行货，京东自营商品开具机打发票或电子发票。<br>
                </div>
              </div>
              <div class="after-sale-title-item">
                <span class="oImg">
                  <h3>全国联保</h3>
                </span>
                <div class="wenZi">
                  凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商<br>
                  品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！<br>
                  注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！<br>
                  并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！<br>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="comment.title" name="comment" v-loading="comment.loading" style="min-height:500px">
            <template v-for="(item, index) in comment.list">
              <comment :comment="item" :key="index"></comment>
            </template>
            <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="comment.total" :page-size="comment.limit" hide-on-single-page style="float:right">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
        <div class="clearboth"></div>
      </div>
    </div>
    <div class="cd-cart-container">
      <a class="cd-cart-trigger">
        <ul class="count">
          <!-- cart items count -->
          <li>{{carts.length}}</li>
        </ul> <!-- .count -->
      </a>

      <div class="cd-cart">
        <div class="wrapper">
          <header>
            <h2>Cart</h2>
          </header>

          <div class="body">
            <ul>
              <li class="product" v-for="(cart, index) in carts" :key="index">
                <div class="product-img"><img :src="cart.skuPic">
                  <!---->
                </div>
                <div class="product-detail">
                  <h3 @click="$router.push({name: 'ProductDetail', query: {skuId: cart.skuId}})"><a :title="cart.skuName">{{cart.skuName}}</a></h3>
                  <div class="product-info">
                    <div class="product-info-attr">
                      <p v-for="(attr, index) in JSON.parse(cart.skuAttrsVals)" :key="index">{{attr.attrName}}: {{attr.attrValue}}</p>
                    </div>
                    <div class="product-info-count">
                      X <span style="color:red;font-size:14px; font-weight:bolder">{{cart.skuQuantity}}</span>
                    </div>
                    <div class="product-info-price">
                      ￥{{formatMoney(cart.skuPrice * cart.skuQuantity)}}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <footer>
            <a class="checkout btn" @click="$router.push({name:'ShoppingCart'})"><em>去结算 ￥<span>{{formatMoney(cartTotalAmount)}}</span></em></a>
          </footer>
        </div>
      </div> <!-- .cd-cart -->
    </div>
  </div>

</template>

<script>
import '@/style/iconfont/iconfont.css'
import $ from 'jquery'
import SingleSelector from '@/components/SingleSelector'
import Comment from '@/components/Comment'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { formatMoney } from '@/utils/utils'
import 'swiper/swiper-bundle.css'
export default {
  components: {
    SingleSelector,
    Comment,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      // 表示鼠标放到了第几张图片上
      imgHover: 0,
      // 轮播图
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 0,
        preventClicks: false
      },
      // 购买数量
      count: 1,
      sku: {
        skuDefaultImg: '',
        price: 0
      },
      images: [],
      desc: {},
      saleAttrs: [],
      groupAttrs: [],
      skuAttrsVals: '',
      // 该数组包含了选择属性的商品id, 对数组求交集就可以知道选择了哪一个商品
      /*
      每一个销售属性都包含一个sku数组,表示哪些sku有这个属性
      例如: select:[[1,2,3],[3,4,5],[3,5,6]]
      对上述数组求交集,得出skuid为3
      */
      select: [],
      comment: {
        list: [],
        total: 0,
        page: 1,
        limit: 16,
        loading: false,
        title: '商品评价'
      }
    }
  },
  computed: {
    imgList: function () {
      return this.images.map((img) => img.imgUrl)
    },
    descImgList: function () {
      return (this.desc.decript || '').split(',')
    },
    carts: {
      get () {
        return this.$store.state.user.carts
      },
      set (val) {
        this.$store.commit('user/updateCarts', val)
      }
    },
    cartTotalAmount: function () {
      var totalAmount = 0
      for (let i = 0; i < this.carts.length; i++) {
        const cart = this.carts[i]
        totalAmount += cart.skuPrice * cart.skuQuantity
      }
      return totalAmount
    }
  },
  watch: {
    $route (to, from) {
      this.select = []
      this.imgHover = 0
      this.count = 1
      this.getskuDetail(to.query.skuId)
    }
  },
  methods: {
    getskuDetail (skuId) {
      this.$http({
        url: this.$http.adornUrl('/product/skuinfo/skuDetail/' + skuId),
        method: 'get',
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.sku = data.data.sku
          this.desc = data.data.desc
          this.images = data.data.images
          this.groupAttrs = data.data.groupAttrs
          this.saleAttrs = data.data.saleAttrs
          this.skuAttrsVals = data.data.skuAttrsVals
        } else {
          this.$notify({
            title: data.code,
            message: data.msg,
            type: 'error'
          })
        }
      })
    },

    // 当鼠标放在小图上时,自动切换大图
    mouseenter (index) {
      this.imgHover = index
      this.sku.skuDefaultImg = this.images[index].imgUrl
    },

    // 添加到购物车
    addToCart () {
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
        skuId: this.sku.skuId,
        count: this.count
      }

      this.$http({
        url: this.$http.adornUrl('/product/skuinfo/addcart'),
        method: 'post',
        data: this.$http.adornData(data, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          var cart = this.createCartInfo()
          this.$store.commit('user/addCart', cart)
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
    },

    // 收藏
    collect () {
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
        skuId: this.sku.skuId
      }
      this.$http({
        url: this.$http.adornUrl('/member/membercollectsku/collect/sku'),
        method: 'post',
        data: this.$http.adornData(data, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$notify({
            title: '获取数据成功',
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
    },

    /**
     * 计算属性选择的交集,得到skuid
     */
    getSkuId (arrs) {
      var arr = arrs.shift()
      for (var i = arrs.length; i--;) {
        var p = { boolean: {}, number: {}, string: {} }
        var obj = []
        arr = arr.concat(arrs[i]).filter(function (x) {
          var t = typeof x
          return !(t in p
            ? !p[t][x] && (p[t][x] = 1)
            : obj.indexOf(x) < 0 && obj.push(x))
        })
        if (!arr.length) return null
      }
      return arr[0]
    },

    attrClick (arr) {
      this.select = []
      for (let i = 0; i < this.saleAttrs.length; i++) {
        const _attr = this.$refs['item' + i]
        this.select.push(_attr[0].attr.attrValues[_attr[0].select].skuIds)
      }
      this.$router.push({
        name: 'ProductDetail',
        query: {
          skuId: this.getSkuId(this.select)
        }
      })
    },

    /**
     * 价格格式化
     */
    formatMoney (price) {
      return formatMoney(price, 2)
    },

    /**
     * 创建一条购物车信息
     */
    createCartInfo () {
      const data = {
        skuId: this.sku.skuId,
        skuAttrsVals: this.skuAttrsVals,
        skuName: this.sku.skuName,
        skuQuantity: this.count,
        skuPic: this.sku.skuDefaultImg,
        skuPrice: this.sku.price
      }
      return data
    },

    /**
     * tab点击事件
     */
    tabClick (tab) {
      if (tab.index === '3') {
        this.getCommentList()
      }
    },

    /**
     * 获取去该spu下的所有评论
     */
    getCommentList () {
      this.comment.spuId = this.sku.spuId
      this.comment.loading = true
      this.$http({
        url: this.$http.adornUrl('/product/spucomment/list'),
        method: 'get',
        params: this.$http.adornParams({
          page: this.comment.page,
          limit: this.comment.limit,
          spuId: this.comment.spuId
        })
      })
        .then(({ data }) => {
          if (data && data.code === 0) {
            const { page } = data
            this.comment.total = page.totalCount
            this.comment.list = page.list
            this.comment.title = '商品评价(' + page.list.length + ')'
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
          this.comment.loading = false
        })
    },
    /**
     * 评论分页
    */
    handleCurrentChange (val) {
      this.comment.page = val
      this.getCommentList()
    }
  },
  created () {
    this.imgHover = 0
    const skuId = this.$route.query.skuId
    this.getskuDetail(skuId)
  },
  mounted () {
    this.$nextTick(() => {
      var cartWrapper = $('.cd-cart-container')
      if (cartWrapper.length > 0) {
        // store jQuery objects
        var cartTrigger = cartWrapper.children('.cd-cart-trigger')

        // open/close cart
        cartTrigger.on('click', function (event) {
          event.preventDefault()
          toggleCart()
        })

        // close cart when clicking on the .cd-cart-container::before (bg layer)
        cartWrapper.on('click', function (event) {
          if ($(event.target).is($(this))) toggleCart(true)
        })
      }

      function toggleCart (bool) {
        var cartIsOpen =
          typeof bool === 'undefined' ? cartWrapper.hasClass('cart-open') : bool

        if (cartIsOpen) {
          cartWrapper.removeClass('cart-open')
        } else {
          cartWrapper.addClass('cart-open')
        }
      }
    })
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
<style src="../style/css/product-detail.css" scoped>
</style>
