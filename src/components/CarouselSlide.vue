<template>
  <div class="body">
    <div @click="leftClick" class="left"><i class="icon iconfont icon-pc-zuo"></i></div>
    <div @click="rightClick" class="right"><i class="icon iconfont icon-pc-you"></i></div>
    <div class="cont">
      <ul ref="outer1_ul">
        <li v-for="(item, index) in array" :key="index">
          <router-link :to="item.to">
            <el-image :src="item.imgSrc" fit="cover" style="width:275px; height: 275px;"></el-image>
          </router-link>
          <router-link :to="item.to">
            <p>{{item.title}}</p>
          </router-link>
          <router-link :to="item.to"><span>¥{{item.price}}</span></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-item',
  props: {
    array: Array
  },
  components: {},
  data () {
    return {
      count: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    rightClick () {
      this.count++
      if (this.count === 4) {
        this.count = 0
      }
      this.$refs.outer1_ul.style.left = -285 * this.count + 'px'
    },
    leftClick () {
      this.count--
      if (this.count === -1) {
        this.count = 3
      }
      this.$refs.outer1_ul.style.left = -285 * this.count + 'px'
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
.body {
  position: relative;
  width: 1140px;
  margin: 0 auto;
}

.body .cont {
  position: relative;
  width: 1140px;
  height: 365px;
  overflow: hidden;
  margin: 0 auto 15px;
}

.body i {
  font-size: 30px;
  color: #999;
}

.body .left {
  position: absolute;
  top: 35%;
  left: -30px;
  cursor: pointer;
}
.body .right {
  position: absolute;
  top: 35%;
  right: -30px;
  cursor: pointer;
}

.body i:hover {
  color: #111;
  font-size: 32px;
}

.body ul {
  position: relative;
  width: 1995px;
  height: 365px;
  left: 5px;
  /*left: -275px;*/
  transition: all 0.5s;
}

.body ul li {
  list-style: none;
  float: left;
  width: 285px;
  height: 100%;
}

.body ul li p {
  height: 20px;
  line-height: 20px;
  /*background-color: #795da3;*/
  margin: 10px auto 4px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #000000;
}

.body ul li span {
  display: block;
  /*width: 100%;*/
  text-align: center;
  font-size: 14px;
  color: #db2e2e;
}
</style>
