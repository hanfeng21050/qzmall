<template>
  <div v-loading="loading">
    <el-card class="box-card">
      <div class="search" style="float:left; height:40px; line-height: 40px;">
        <el-input clearable v-model="searchKey" placeholder="商品名称" size="mini" style="isplay: inline-block; width:150px; margin-right:18px;"></el-input>
        <el-button type="warning" size="mini" @click="getProdtctList">查询</el-button>
      </div>

      <div class="operation" style="float:right;height:40px; line-height: 40px;">
        <transition name="slide">
          <div class="op" style="display:inline" v-show="operateVisible">
            <el-checkbox label="全选" style="margin-right:18px;" v-model="isSelectAll" @change="selectAll(isSelectAll, $event)"></el-checkbox>
            <!-- <el-button type="text" style="color: black" v-show="operateVisible">加入购物车</el-button> -->
            <span @click="unCollectBatch">移出收藏</span>
          </div>
        </transition>
        <el-button type="warning" size="mini" style="margin:0 10px; width:80px" @click="operateVisible = !operateVisible">{{operateVisible ? '完成' : '批量操作'}}</el-button>
      </div>

      <div class="s_prod" v-loading="loading">
        <div class="product-item" v-for="collection in collections" :key="collection.skuId">
          <div class="item-mask" v-show="operateVisible">
            <el-checkbox style="float:right; margin-right:5px; margin-top:5px;zoom:150%;" v-model="collection.select"></el-checkbox>
          </div>
          <div class="item">
            <p class="da">
              <a :title="collection.skuName">
                <el-image class="dim" :src="collection.skuDefaultImg" />
              </a>
            </p>
            <p class="tab_JE">
              <a :title="collection.skuName" @click="toDetail(collection.skuId)" v-html="collection.skuName">
              </a>
            </p>
            <p class="tab_R">
              <span>¥{{collection.skuPrice}}</span>
            </p>
            <div class="product-item-hover">
              <p @click="placeTop(collection.id, 1 - collection.top)">{{collection.top === 1 ? '取消置顶': '置顶'}}</p>
              <p @click="toStore(collection.skuId)">查看店铺</p>
              <p @click="unCollect(collection.id)">取消收藏</p>
            </div>
          </div>
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="text-align:right" :current-page="currPage">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      operateVisible: false,
      searchKey: '',
      collections: [],
      currPage: 1,
      pageSize: 16,
      total: 1000
    }
  },
  computed: {
    isSelectAll: {
      get () {
        // 如果productList中每一条数据的select都为true，返回true，否则返回false;
        return this.collections.every(function (val) {
          return val.select
        })
      },
      set () {}
    },
    selected: function () {
      return this.collections
        .filter((item) => {
          return item.select
        })
        .map((item) => {
          return item.id
        })
    }
  },
  watch: {},
  methods: {
    getProdtctList () {
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/member/membercollectsku/list'),
        method: 'get',
        headers: {
          token: this.$cookie.get('token')
        },
        params: this.$http.adornParams({
          page: this.currPage,
          limit: this.pageSize,
          key: this.searchKey
        })
      })
        .then(
          ({ data }) => {
            if (data.code === 0) {
              this.collections = data.page.list

              // 是否选中初始化
              var _this = this
              this.collections.map(function (item) {
                _this.$set(item, 'select', false)
              })

              this.currPage = data.page.currPage
              this.total = data.page.totalCount
            } else {
              this.$notify({
                title: data.code,
                message: data.msg,
                type: 'error'
              })
            }
          },
          (error) => {
            this.$notify({
              title: error.message,
              type: 'error'
            })
          }
        )
        .finally(() => {
          this.loading = false
        })
    },

    // 跳转到商铺
    toStore (skuId) {
      this.$notify({
        title: '功能开发中,敬请期待',
        type: 'error'
      })
    },

    // 取消收藏
    unCollect (id) {
      const data = [id]
      this.$http({
        url: this.$http.adornUrl('/member/membercollectsku/unCollect/sku'),
        method: 'post',
        headers: {
          token: this.$cookie.get('token')
        },
        data: this.$http.adornData(data, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$notify({
            title: '取消成功',
            type: 'success',
            duration: 1500
          })
          this.getProdtctList()
        } else {
          this.$notify({
            title: data.code,
            message: data.msg,
            type: 'error',
            duration: 1500
          })
        }
      })
    },

    // 批量取消收藏
    unCollectBatch () {
      if (!this.selected || this.selected.length === 0) {
        this.$notify({
          title: '至少选择一项',
          type: 'error'
        })
        return
      }
      console.log(this.selected)

      this.$http({
        url: this.$http.adornUrl('/member/membercollectsku/unCollect/sku'),
        method: 'post',
        headers: {
          token: this.$cookie.get('token')
        },
        data: this.$http.adornData(this.selected, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$notify({
            title: '取消成功',
            type: 'success',
            duration: 1500
          })
          this.getProdtctList()
        } else {
          this.$notify({
            title: data.code,
            message: data.msg,
            type: 'error',
            duration: 1500
          })
        }
      })
    },

    // 置顶操作
    placeTop (id, top) {
      const data = {
        id: id,
        top: top
      }
      this.$http({
        url: this.$http.adornUrl('/member/membercollectsku/collect/top'),
        method: 'post',
        headers: {
          token: this.$cookie.get('token')
        },
        data: this.$http.adornData(data, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$notify({
            title: top === 0 ? '置顶成功' : '取消置顶成功',
            type: 'success',
            duration: 1500
          })
          this.getProdtctList()
        } else {
          this.$notify({
            title: data.code,
            message: data.msg,
            type: 'error',
            duration: 1500
          })
        }
      })
    },

    handleCurrentChange (val) {
      this.currPage = val
      this.getProdtctList()
    },

    // 跳转到商品详情
    toDetail (skuId) {
      this.$router.push({
        name: 'ProductDetail',
        query: {
          skuId: skuId
        }
      })
    },
    // 选中所有
    selectAll (isSelectAll, val) {
      for (var i = 0, len = this.collections.length; i < len; i++) {
        this.collections[i].select = !isSelectAll
      }
    }
  },
  created () {
    this.$store.commit('user/updateUserMenuTitle', '我的收藏')
    this.getProdtctList()
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
.slide-enter-active, .slide-leave-active {
  transition: opacity .5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.s_prod {
  width: 868px;
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.product-item {
  background: #fff;
  width: 25%;
  border: 1px solid rgb(185, 185, 185);
  position: relative;
}

.item-mask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.operation .op span {
  margin: 0 10px;
  cursor: pointer;
}
.operation .op span:hover {
  color: #faa13c;
}

.item:hover .product-item-hover {
  transform: scaleY(1);
}

.product-item-hover {
  position: absolute;
  transform: scaleY(0);
  transform-origin: 50% 0;
  transition: all ease-in-out 0.2s;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
}

.product-item-hover p {
  font-size: 14px;
  padding: 5px;
  flex: 1;
  text-align: center;
  margin-right: 1px;
  background-color: rgba(65, 64, 64, 0.5);
  cursor: pointer;
  color: white;
}
.product-item-hover p:last-child {
  margin-right: 0;
}
.product-item-hover p:hover {
  background-color: #faa13c;
}

.product-item {
  padding: 10px 0;
  margin: 10px 0;
  width: 210px;
  box-sizing: border-box;
}

.product-item > .da {
  text-align: center;
  border-bottom: 1px solid rgb(185, 185, 185);
}

.product-item > .da .dim {
  width: 200px;
  height: 200px;
}

.product-item .tab_R {
  color: #be6307;
  font-size: 15px;
  font-weight: 800;
  text-align: center;
}

.product-item .tab_R span {
  display: none;
}
.product-item .tab_R span:first-child {
  display: block;
}

.product-item .tab_JE {
  margin: 5px 10px;
}
.product-item .tab_JE a {
  display: none;
  color: #666;
  font-size: 14px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  text-align: center;

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

.split-line {
  width: 100%;
  height: 1px;
  background-color: rgb(226, 225, 225, 0.6);
}
</style>
