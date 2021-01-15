<template>
  <div class="product-item">
    <p class="da">
      <a :title="sku.skuTitle" @click="toDetail(sku.skuId)">
        <img class="dim" :src="sku.skuImg">
      </a>
    </p>

    <!-- <div class="split-line"></div> -->

    <p class="tab_R">
      <span>¥{{price}}</span>
    </p>

    <p class="tab_JE">
      <a :title="sku.skuTitle" @click="toDetail(sku.skuId)" v-html="sku.skuTitle">
      </a>
    </p>
  </div>
</template>

<script>
import { formatMoney } from '@/utils/utils'
export default {
  props: {
    sku: {
      type: Object
    }
  },
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    price: function () {
      return formatMoney(this.sku.skuPrice, 0)
    }
  },
  watch: {},
  methods: {
    toDetail (skuId) {
      this.$router.push({
        name: 'ProductDetail',
        query: {
          skuId: skuId
        }
      })
    }
  },
  created () {},
  mounted () {
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
.product-item {
  background: #fff;
  width: 25%;
  transition: all .5s;
}
.product-item:hover{
  /* border-radius: 5px;
  box-shadow: 0 0 5px 0.5px rgb(185, 185, 185); */
  transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
}

.product-item {
  padding: 10px 0;
  margin: 10px 0;
  width: 265px;
  box-sizing: border-box;
}

.product-item > .da {
  text-align: center;
}

.product-item > .da .dim {
  width: 250px;
  height: 260px;
}

.product-item .tab_R {
  color: #be6307;
  font-size: 18px;
  font-weight: 800;
  margin: 10px;
}

.product-item .tab_R span {
  display: none;
}
.product-item .tab_R span:first-child {
  display: block;
}

.product-item .tab_JE {
  margin: 10px;
}
.product-item .tab_JE a {
  display: none;
  color: #666;
  font-size: 14px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-item .tab_JE a:hover {
  color: #da7007;
}

.product-item .tab_JE a:first-child {
  display: block;
}

.split-line{
  width: 100%;
  height: 1px;
  background-color: rgb(226, 225, 225, 0.6);
}
</style>
