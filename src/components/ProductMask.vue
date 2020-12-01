<template>
  <div class="container">
    <el-image class="img" fit="cover" src="https://coolmall-oss.oss-cn-hangzhou.aliyuncs.com/2020-11-05/f6e92ba5-73a7-4abf-87d4-54a93816239f_a2c208410ae84d1f.jpg" />
    <div href="" class="cont">
      <p class="p1">苹果11</p>
      <p class="p2">¥11.0</p>
    </div>
    <router-link to="/product/detail" class="a3">
      <div class="mask">查看详情</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
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
<style scope>
.container {
  widows: 100%;
  height: 100%;
}

.img {
  width: 100%;
}

.p1 {
  font-weight: bold;
  color: #333;
  font-size: 15px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.p2 {
  font-size: 15px;
  height: 39px;
  line-height: 39px;
  color: #e02b41;
  text-align: center;
}

.a3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: none;
}

.mask {
  position: relative;
  top: 50%;
  left: 50%;
  margin-left: -75px;
  margin-top: -25px;
  width: 150px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #ffffff;
  background-color: #c78a49;
  text-align: center;
}

.container:hover .a3 {
  display: block;
}

</style>
