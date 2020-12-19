<template>
  <div class="s_content">
    <!-- <div class="carousel">
    </div> -->

    <div class="menu">
      <ul>
        <li v-for="(cate1) in categoryList" :key="cate1.catId">
          <a herf="javascript:;">{{cate1.name}}</a> <span></span>
          <div class="submenu">
            <div class="subleft">
              <dl v-for="(cate2) in cate1.children" :key="cate2.catId">
                <dt>{{cate2.name}}</dt>
                <dd>
                  <router-link :to="{name: 'ProductList', params: {catelog3Id: cate3.catId}}" v-for="(cate3,index) in cate2.children" :key="cate3.catId +'-'+index">{{cate3.name}}</router-link>
                </dd>
              </dl>
            </div>
          </div>
        </li>
      </ul>
      <div class="right">
        <el-carousel class="carousel" height="600px" >
          <el-carousel-item>
            <img :src="require('@/style/images/carousel1.jpg')" style="vertical-align:middle; height:600px; width:968px; border-radius: 8px;object-fit: cover;" >
          </el-carousel-item>
           <el-carousel-item>
            <img :src="require('@/style/images/carousel2.jpg')" style="vertical-align:middle; height:600px; width:968px; border-radius: 8px;object-fit: cover;" >
          </el-carousel-item>
           <el-carousel-item>
            <img :src="require('@/style/images/carousel3.jpg')" style="vertical-align:middle; height:600px; width:968px; border-radius: 8px;object-fit: cover;" >
          </el-carousel-item>
        </el-carousel>
      </div>

    </div>

    <div class="outer2">
      <p class="title"><a href="">专题活动，现实促销</a></p>
      <div class="subtitle">
        <p>严选材质，用心设计，精致家居生活</p>
      </div>
      <div class="inter3">
        <div class="left">
          <product-zoom></product-zoom>
        </div>
        <div class="right1">
          <product-zoom></product-zoom>
        </div>
        <div class="right2">
          <product-zoom></product-zoom>
        </div>
      </div>
    </div>
    <div class="box">
      <p class="title"><a href="">青竹良品，你的家居首选</a></p>
      <div class="subtitle">
        <p>天然之源，诚挚之礼，严格质检</p>
      </div>
      <div class="box2">
        <ul>
          <div class="start">
            <a href=""><img src="../style/images/png1.png" alt=""></a>
            <a href="" class="a1"></a>
          </div>
          <div class="start1">
            <a href=""><img src="../style/images/png6.png" alt=""></a>
            <a href="" class="a2"></a>
          </div>
          <div class="end">
            <li><a href="查看详情.html"><img src="../style/images/png4.png" alt=""></a>
              <p class="p11"><a href="">经典系列时钟</a></p>
              <p class="p22">¥580.00</p>
              <a href="" class="a11">
                <div class="d11">查看详情</div>
              </a>
            </li>
            <li><a href="查看详情.html"><img src="../style/images/png4.png" alt=""></a>
              <p class="p11"><a href="">经典系列时钟</a></p>
              <p class="p22">¥580.00</p>
              <a href="" class="a11">
                <div class="d11">查看详情</div>
              </a>
            </li>
            <li><a href="查看详情.html"><img src="../style/images/png4.png" alt=""></a>
              <p class="p11"><a href="">经典系列时钟</a></p>
              <p class="p22">¥580.00</p>
              <a href="" class="a11">
                <div class="d11">查看详情</div>
              </a>
            </li>
            <li><a href="查看详情.html"><img src="../style/images/png5.png" alt=""></a>
              <p class="p11"><a href="">不锈钢夹子</a></p>
              <p class="p22">¥120.00</p>
              <a href="" class="a11">
                <div class="d11">查看详情</div>
              </a>
            </li>
            <li class="l1"><a href="查看详情.html"><img src="../style/images/png7.png" alt=""></a>
              <p class="p11"><a href="">黑桃自然花香蜡烛</a></p>
              <p class="p22">¥580.00</p>
              <a href="" class="a11">
                <div class="d11">查看详情</div>
              </a>
            </li>
            <li><a href="查看详情.html"><img src="../style/images/png8.png" alt=""></a>
              <p class="p11"><a href="">简单大容量瓷碗</a></p>
              <p class="p22">¥150.00</p>
              <a href="" class="a11">
                <div class="d11">查看详情</div>
              </a>
            </li>
            <li><a href="查看详情.html"><img src="../style/images/png9.png" alt=""></a>
              <p class="p11"><a href="">不锈钢汤勺</a></p>
              <p class="p22">¥120.00</p>
              <a href="" class="a11">
                <div class="d11">查看详情</div>
              </a>
            </li>
            <li><a href="查看详情.html"><img src="../style/images/png10.png" alt=""></a>
              <p class="p11"><a href="">不锈钢大号汤勺</a></p>
              <p class="p22">¥120.00</p>
              <a href="" class="a11">
                <div class="d11">查看详情</div>
              </a>
            </li>
          </div>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
import ProductZoom from '@/components/ProductZoom'
export default {
  components: {
    ProductZoom
  },
  data () {
    return {
      loadding: true,
      count: 0,
      iamges: [
        {
          url: '@/style/images/start.png'
        },
        {
          url: '@/style/images/start1.png'
        },
        {
          url: '@/style/images/start2.png'
        }
      ],
      newProduct: [
        {
          to: '/product/detail',
          imgSrc:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '便携简约清扫扫帚',
          price: 580.0
        },
        {
          to: '/product/detail',
          imgSrc:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '简约多拼接彩色木制积木',
          price: 300.0
        },
        {
          to: '/product/detail',
          imgSrc: './style/images/png3.png',
          title: '黑桃自然花香蜡烛',
          price: 450.0
        },
        {
          to: '/product/detail',
          imgSrc: './style/images/png2.png',
          title: '便携简约清扫扫帚',
          price: 590.0
        },
        {
          to: '/product/detail',
          imgSrc: './style/images/png2.png',
          title: '便携简约清扫扫帚',
          price: 590.0
        },
        {
          to: '/product/detail',
          imgSrc: './style/images/png2.png',
          title: '便携简约清扫扫帚',
          price: 590.0
        },
        {
          to: '/product/detail',
          imgSrc: './style/images/png2.png',
          title: '便携简约清扫扫帚',
          price: 590.0
        }
      ],
      categoryList: []
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {
    this.$http({
      url: this.$http.adornUrl('/product/category/list/tree'),
      method: 'get',
      params: this.$http.adornParams({})
    }).then(({ data }) => {
      this.categoryList = data.data
    })
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
