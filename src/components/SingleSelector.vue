<template>
  <div class="box-attr">
    <dl>
      <!-- <mu-button round v-for="(type,index) in goodsType" color="#F4F4F4" @click="selectType(index)" ">{{type}}</mu-button> -->
      <dt>选择{{attr.attrName}}</dt>
      <dd class="flexBox" v-for="(val, index) in attr.attrValues" :key="index" @click="singleSelect(index)" :class="{'select':index===select}">
        <img v-if="attr.hasImg" :src="val.img">
        <div class="name">{{val.val}}</div>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    attr: {
      type: Object,
      default: function () {
        const attr = {
          attrId: 1,
          attrName: '颜色',
          hasImg: true,
          attrValues: [
            {
              val: '红色',
              img: require('../style/img/59ded62eN64a9784c.jpg')
            },
            {
              val: '黑色',
              img: require('../style/img/59ded62eN64a9784c.jpg')
            },
            {
              val: '红色',
              img: require('../style/img/59ded62eN64a9784c.jpg')
            }
          ]
        }
        return attr
      }
    },
    hasImg: Boolean
  },
  components: {},
  data () {
    return {
      select: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    singleSelect (val) {
      this.select = val
    }
  },
  created () {},
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
<style scoped>
.box-attr {
  overflow: hidden;
  margin-top: 16px;
  margin-bottom: 4px;
}

.box .box-two .box-attr img {
  width: 40px;
  height: 40px;
}

.box .box-two .box-attr dt,
.box .box-two .box-attr dd {
  float: left;
}

.box .box-two .box-attr dt {
  padding-left: 10px;
  font-family: simsun;
  color: #999;
  line-height: 40px;
}

.box .box-two .box-attr dd {
  border: solid 1px #cccccc;
  background: #f7f7f7;
  margin: 0 5px;
  height: 40px;
  cursor: pointer;
}

.box .box-two .box-attr dd img {
  vertical-align: -15px;
}
.box .box-two .box-attr dd .name {
  line-height: 40px;
  padding: 0 10px;
}

.flexBox {
  display: flex;
}

.box .box-two .box-attr .select {
  border: 1px solid red;
}
</style>
