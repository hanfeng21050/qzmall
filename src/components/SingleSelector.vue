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
      type: Object
    },
    skuId: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data () {
    return {
      select: -1
    }
  },
  computed: {},
  watch: {
    skuId: {
      immediate: true,
      handler (val) {
        this.defalutSelect(val)
      }
    }
  },
  methods: {
    singleSelect (val) {
      // 如果当前已经选中,则不需要触发父组件的方法
      if (this.select !== val) {
        this.select = val
        // todo
        this.$emit('attrClick')
      }
    },

    // 默认选中
    defalutSelect (val) {
      const arr = this.attr.attrValues
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].skuIds.indexOf(val + '') !== -1) {
          this.select = i
          break
        }
      }
    }
  },
  created () {
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
  padding: 0;
  margin: 0 5px;
  height: 40px;
  cursor: pointer;
}
.box .box-two .box-attr dd .name {
  width: 100%;
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
