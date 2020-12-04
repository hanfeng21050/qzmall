<template>
  <div>
    <p class="da">
      <a href="#" :title="spu.spuName">
        <img :src="spu.skuList[0].skuImg" class="dim">
      </a>
    </p>
    <ul class="tab_im">
      <li v-for="sku in spu.skuList" :key="sku.skuId"><a href="#" :title="sku.skuName" @click="toDetail(sku.skuId)"><img :src="sku.skuImg"></a></li>
    </ul>
    <p class="tab_R">
      <span v-for="sku in spu.skuList" :key="sku.skuId">¥{{sku.skuPrice}}</span>
    </p>

    <p class="tab_JE">
      <a  v-for="sku in spu.skuList" :key="sku.skuId" href="#" :title="sku.skuName" @click="toDetail(sku.skuId)">
        {{sku.skuName}}
      </a>
    </p>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: {
    spu: {
      type: Object
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    toDetail (spuId) {
      console.log('http://localhost:88/api/product/spuinfo/spuDetail/' + spuId)
    }
  },
  created () {},
  mounted () {
    $('.tab_im img').hover(function () {
      var a = $(this).prop('src')
      var index = $(this).parents('li').index()
      $(this)
        .parents('li')
        .css('border', '1.5px solid red')
        .siblings('li')
        .css('border', '1.5px solid #ccc')
      $(this).parents('ul').prev().find('img').prop('src', a)
      $(this)
        .parents('ul')
        .siblings('.tab_JE')
        .find('a')
        .eq(index)
        .css('display', 'block')
        .siblings('a')
        .css('display', 'none')
      $(this)
        .parents('ul')
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
div:hover {
  box-shadow: 0 0 1px 0.5px #666;
}

div {
  padding: 10px 5px;
  height: 405px;
  width: 265px;
  box-sizing: border-box;
}

div > .da {
  text-align: center;
}

div > .da img {
  width: 250px;
  height: 260px;
}
div > ul {
  overflow: hidden;
  text-align: center;
  margin-left: 10px;
  margin-top: 10px;
}

div > ul li:first-child {
  border: 1.5px solid rgb(255, 50, 50);
}

div > ul li {
  overflow: hidden;
  margin-right: 3px;
  border: 1.5px solid #ccc;
  box-sizing: border-box;
  float: left;
}

div > ul li img {
  margin: 4px;
  float: left;
  width: 30px;
  height: 30px;
}

div .tab_R {
  color: #be6307;
  font-size: 18px;
  font-weight: 800;
  margin: 10px;
}

div .tab_R span {
  display: none;
}
div .tab_R span:first-child {
  display: block;
}

div .tab_JE {
  margin: 10px;
}

div .tab_JE a {
  display: none;
  color: #666;
  font-size: 14px;
  font-weight: bold;
  height: 18px;
}

div .tab_JE a:hover {
  color: #da7007;
}

div .tab_JE a:first-child {
  display: block;
}
</style>
