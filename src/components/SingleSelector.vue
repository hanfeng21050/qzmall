<template>
  <div class="box-attr">
    <dl>
      <!-- <mu-button round v-for="(type,index) in goodsType" color="#F4F4F4" @click="selectType(index)" ">{{type}}</mu-button> -->
      <dt>选择{{attr.attrName}}</dt>
      <dd class="flexBox" v-for="(item, index) in attr.attrValues" :key="index" @click="singleSelect(index)" :class="{'select':index===select}">
        <div class="name">{{item.attrValue}}</div>
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
          attrValues: [
            {
              attrValue: '红色',
              skuIds: [0, 2, 3]
            },
            {
              attrValue: '黑色',
              skuIds: [4, 5, 6]
            },
            {
              attrValue: '红色',
              skuIds: [7, 8, 9]
            }
          ]
        }
        return attr
      }
    },
    skuId: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data () {
    return {
      select: 1
    }
  },
  computed: {},
  watch: {},
  methods: {
    singleSelect (val) {
      this.select = val
      // todo
    }
  },
  created () {
    // 默认选中
    const arr = this.attr.attrValues
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].skuIds.indexOf(this.skuId) !== -1) {
        this.select = i
        break
      }
    }
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
<style scoped>
.box-attr {
  overflow: hidden;
  margin-top: 16px;
  margin-bottom: 4px;
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
