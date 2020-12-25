<template>
  <div class="body">
    <p class="da">
      <a :title="sku.skuTitle" @click="toDetail(sku.skuId)">
        <img class="dim" :src="sku.skuImg">
      </a>
    </p>

    <div class="split-line"></div>

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
        path: '/product/detail',
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
.body {
  box-shadow: 0 0 1px 0.5px rgb(185, 185, 185);
  border-radius: 5px;
}
.body:hover{
  box-shadow: 0 0 5px 0.5px rgb(185, 185, 185);
}

.body {
  padding: 10px 0;
  margin: 10px 0;

  width: 265px;
  box-sizing: border-box;
}

.body > .da {
  text-align: center;
}

.body > .da .dim {
  width: 250px;
  height: 260px;
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
  height: 30px;
  line-height: 30px;

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

.split-line{
  width: 100%;
  height: 1px;
  background-color: rgb(226, 225, 225, 0.6);
}
</style>
