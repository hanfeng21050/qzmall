<template>
  <div class="s_content">
    <div class="detail-body">
      <el-backtop></el-backtop>
      <el-breadcrumb class="crumb-wrap" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="">
        <div class="box">
          <div class="boxx">
            <div class="imgbox">
              <div class="probox">
                <img class="img1" :src="sku.skuDefaultImg">
                <div class="hoverbox" style="display: none; opacity: 0.3; left: 0px; top: 140px;"></div>
              </div>
              <div class="showbox" style="display: none;">
                <img class="img1" alt="" :src="sku.skuDefaultImg" style="left: 0px; top: -190.909px;">
              </div>
            </div>
            <div class="box-thumb">
              <swiper class="swiper" ref="mySwiper" :options="swiperOption">
                <swiper-slide class="swiper-slide" v-for="(img, index) in images" :key="img.id">
                  <img class="thumb" @mouseenter="mouseenter(index)" :src="img.imgUrl" :style="imgHover === index ? 'border:1px solid #c78a49' : ''">
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
                  <span>{{price}}</span>
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
              <div class="box-btns-two" @click="addToCart">
                <a>
                  加入购物车
                </a>
              </div>
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
            <h4>选购达人</h4>
          </div>
          <div class="mc">
            <ul class="plist">
              <li>
                <a href="##"><img src="../style/images/57d11c72N093250ec.jpg"></a>
                <p>
                  <a href="##">OPPO R11s Plus 双卡双待全面屏拍照手机香槟色 全网通(6G RAM+64G ROM)标配</a>
                </p>
                <p><strong class="J-p-20015341974">￥3699.00</strong></p>
              </li>
              <li>
                <a href="##"><img src="../style/images/57d11c72N093250ec.jpg"></a>
                <p>
                  <a href="##">OPPO R11s Plus 双卡双待全面屏拍照手机香槟色 全网通(6G RAM+64G ROM)标配</a>
                </p>
                <p><strong class="J-p-20015341974">￥3699.00</strong></p>
              </li>
              <li>
                <a href="##"><img src="../style/images/57d11c72N093250ec.jpg"></a>
                <p>
                  <a href="##">OPPO R11s Plus 双卡双待全面屏拍照手机香槟色 全网通(6G RAM+64G ROM)标配</a>
                </p>
                <p><strong class="J-p-20015341974">￥3699.00</strong></p>
              </li>
              <li>
                <a href="##"><img src="../style/images/57d11c72N093250ec.jpg"></a>
                <p>
                  <a href="##">OPPO R11s Plus 双卡双待全面屏拍照手机香槟色 全网通(6G RAM+64G ROM)标配</a>
                </p>
                <p><strong class="J-p-20015341974">￥3699.00</strong></p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品详情 -->
        <el-tabs type="border-card" class="detail">
          <el-tab-pane label="商品介绍">
            <div class="tab-con">
              <ul>
                <li>
                  <div class="jieshao">
                    <img class="xiaoguo" :src="desc.decript">
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
          <el-tab-pane label="商品评价(800+)">// TODO</el-tab-pane>
        </el-tabs>
        <div class="clearboth"></div>
      </div>
    </div>
  </div>

</template>

<script>
import '@/style/iconfont/iconfont.css'
import $ from 'jquery'
import SingleSelector from '@/components/SingleSelector'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
  components: {
    SingleSelector,
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
        price: 0
      },
      images: [],
      desc: {},
      saleAttrs: [],
      groupAttrs: [],
      select: []
    }
  },
  computed: {
    // 格式化价格
    price: function () {
      return new Intl.NumberFormat().format(this.sku.price)
    },
    imgList: function () {
      return this.images.map((img) => img.imgUrl)
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
          console.log(data)
          this.sku = data.data.sku
          this.desc = data.data.desc
          this.images = data.data.images
          this.groupAttrs = data.data.groupAttrs
          this.saleAttrs = data.data.saleAttrs
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
        url: this.$http.adornUrl('/member/cartinfo/addcart'),
        method: 'post',
        headers: {
          token: token
        },
        data: this.$http.adornData(data, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$confirm('添加到购物车成功!', '成功', {
            distinguishCancelAndClose: true,
            confirmButtonText: '前往购物车',
            cancelButtonText: '继续购物'
          })
            .then(() => {
              // 跳转到购物车
              console.log('跳转到购物车')
              this.$router.push('/shoppingcart')
            })
            .catch((action) => {
              // 留在当前页面
              console.log('留在当前页面')
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
        path: '/product/detail',
        query: {
          skuId: this.getSkuId(this.select)
        }
      })
    }
  },
  created () {
    this.imgHover = 0
    const skuId = this.$route.query.skuId
    this.getskuDetail(skuId)
  },
  mounted () {
    function Zoom (imgbox, hoverbox, l, t, x, y, tw, hh, showbox) {
      var moveX = x - l - tw / 2
      // 鼠标区域距离
      var moveY = y - t - hh / 2
      // 鼠标区域距离
      if (moveX < 0) {
        moveX = 0
      }
      if (moveY < 0) {
        moveY = 0
      }
      if (moveX > imgbox.width() - tw) {
        moveX = imgbox.width() - tw
      }
      if (moveY > imgbox.height() - hh) {
        moveY = imgbox.height() - hh
      }
      // 判断鼠标使其不跑出图片框
      var zoomX = showbox.width() / imgbox.width()
      // 求图片比例
      var zoomY = showbox.height() / imgbox.height()

      showbox.css({
        left: -(moveX * zoomX),
        top: -(moveY * zoomY)
      })
      hoverbox.css({
        left: moveX,
        top: moveY
      })
      // 确定位置
    }
    function Zoomhover (imgbox, hoverbox, showbox) {
      var l = imgbox.offset().left
      var t = imgbox.offset().top
      var w = hoverbox.width()
      var h = hoverbox.height()
      $('.probox img,.hoverbox')
        .mouseover(function (e) {
          var x = e.pageX
          var y = e.pageY
          $('.hoverbox,.showbox').show()
          hoverbox.css('opacity', '0.3')
          setTimeout(function () {
            Zoom(imgbox, hoverbox, l, t, x, y, w, h, showbox)
          }, 1)
        })
        .mousemove(function (e) {
          var x = e.pageX
          var y = e.pageY
          setTimeout(function () {
            Zoom(imgbox, hoverbox, l, t, x, y, w, h, showbox)
          }, 1)
        })
        .mouseout(function () {
          showbox.parent().hide()
          hoverbox.hide()
        })
    }
    $(function () {
      Zoomhover($('.probox img'), $('.hoverbox'), $('.showbox img'))
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
