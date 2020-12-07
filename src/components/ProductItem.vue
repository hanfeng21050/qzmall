<template>
  <div class="body">
    <p class="da">
      <a href="#" :title="spu.spuName">
        <img :src="spu.skuList[0].skuImg" class="dim">
      </a>
    </p>
    <swiper class="swiper" ref="mySwiper" :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="sku in spu.skuList" :key="sku.skuId" style="width:40px; height:45px; text-align:center;">
        <img class="thumb" @click="toDetail(sku.skuId)" :src="sku.skuImg">
      </swiper-slide>
    </swiper>
    <p class="tab_R">
      <span v-for="sku in spu.skuList" :key="sku.skuId">¥{{sku.skuPrice}}</span>
    </p>

    <p class="tab_JE">
      <a v-for="sku in spu.skuList" :key="sku.skuId" href="#" :title="sku.skuName" @click="toDetail(sku.skuId)">
        {{sku.skuName}}
      </a>
    </p>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import $ from 'jquery'
export default {
  props: {
    spu: {
      type: Object
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 0,
        slidesPerGroup: 3,
        loopFillGroupWithBlank: true,
        preventClicks: false
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  watch: {},
  methods: {
    toDetail (spuId) {
      console.log('http://localhost:88/api/product/spuinfo/spuDetail/' + spuId)
    }
  },
  created () {},
  mounted () {
    $('.thumb').hover(function () {
      var a = $(this).prop('src')
      var index = $(this).parent('div').index()
      $(this).parent().children('.thumb').css('border', '1.5px solid red')
      $(this)
        .parent()
        .siblings()
        .children('.thumb')
        .css('border', '1.5px solid #ccc')

      $(this).parents('.swiper').prev().find('img').prop('src', a)

      $(this).parents('.swiper')
        .siblings('.tab_JE')
        .find('a')
        .eq(index)
        .css('display', 'block')
        .siblings('a')
        .css('display', 'none')

      $(this)
        .parents('.swiper')
        .siblings('.tab_R')
        .find('span')
        .eq(index)
        .css('display', 'block')
        .siblings('span')
        .css('display', 'none')
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
<style scoped>
.body {
  box-shadow: 0 0 1px 0.5px rgb(185, 185, 185);
  border-radius: 5px;
}
.body:hover{
  box-shadow: 0 0 5px 0.5px rgb(185, 185, 185);
}

.body {
  padding: 10px 5px;
  height: 405px;
  width: 265px;
  box-sizing: border-box;
}

.body > .da {
  text-align: center;
}

.body > .da img {
  width: 250px;
  height: 260px;
}

.body > .swiper .swiper-slide .thumb {
  overflow: hidden;
  width: 40px;
  height: 40px;
  border: 1.5px solid #ccc;
  box-sizing: border-box;
  cursor: pointer;
}

.swiper .swiper-slide:first-child .thumb {
  border: 1.5px solid rgb(255, 50, 50);
}

.body .tab_R {
  color: #be6307;
  font-size: 18px;
  font-weight: 800;
  margin: 10px;
}

.body .tab_R span {
  display: none;
}
.body .tab_R span:first-child {
  display: block;
}

.body .tab_JE {
  margin: 10px;
}
.body .tab_JE a {
  display: none;
  color: #666;
  font-size: 14px;
  font-weight: bold;
  height: 18px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.body .tab_JE a:hover {
  color: #da7007;
}

.body .tab_JE a:first-child {
  display: block;
}
</style>
