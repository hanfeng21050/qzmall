<template>
  <div>
    <el-card class="box-card">

    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      form: {
        id: '',
        username: '',
        mobile: '',
        email: '',
        header: '',
        gender: '',
        birth: '',
        job: '',
        sigin: ''
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  },
  created () {
    this.$store.commit('user/updateUserMenuTitle', '用户资料')
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
</style>
