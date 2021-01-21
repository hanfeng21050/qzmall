<template>
  <div class="s_content">
    <div class="content">
      <div class="account-sidebar">
        <div class="avatar gray-box ">
          <div><el-image class="img" :src="$store.state.user.user.header" fit="cover"/>
            <h5>
              {{user.username}}
            </h5>
          </div>
          <div class="box-inner">
            <ul class="account-nav">
              <li @click="menuClick(index)" v-for="(item, index) in menu" :key="index" :class="item.selected? 'current' : ''">
                <router-link :to="{name:item.name}">{{item.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="account-content">
        <div class="gray-box">
          <div class="title">
            <div>{{$store.state.user.userMenuTitle}}</div>
            <div></div>
          </div>
        </div>

        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  components: {},
  data () {
    return {
      menu: [
        {
          title: '我的订单',
          name: 'Order',
          selected: true
        },
        {
          title: '我的收藏',
          name: 'Collection',
          selected: false
        },
        {
          title: '账户资料',
          name: 'Information',
          selected: false
        },
        {
          title: '收货地址',
          name: 'Address',
          selected: false
        }
      ]
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.user.user
      },
      set (val) {
        this.$store.commit('user/updateUser', val)
      }
    }
  },
  watch: {},
  methods: {
    menuClick (index) {
      this.menu.forEach((item) => {
        item.selected = false
      })
      this.menu[index].selected = true
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
<style src="@/style/css/user/index.css" scoped>
</style>
