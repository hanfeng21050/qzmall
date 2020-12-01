<template>
  <div class="zoom">
    <router-link to="/">
      <!-- <img class="img" src="../style/images/pic1.jpg" alt=""> -->
      <el-image class="img" fit="cover" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt=""></el-image>
    </router-link>
    <span class="border"></span>
  </div>
</template>

<script>
export default {
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
<style scoped>
.zoom {
  width: 100%;
  height: 100%;
}

.img{
  width:100%;
  height: 100%;
}

.img:hover {
  transform: scale(1.2);
  transition: 0.5s;
}
.zoom .border {
  border: 2px solid #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 99.5%;
  height: 99%;
  pointer-events: none;
}

.zoom:hover .border {
  transform: scale(0.96, 0.93);
  transition: 0.5s;
}
</style>
