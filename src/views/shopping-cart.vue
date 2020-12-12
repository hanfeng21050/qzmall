<template>
  <div class="page-shopping-cart" id="shopping-cart">
    <h4 class="cart-title">购物清单</h4>
    <div class="cart-product clearfix">
      <table v-loading="loading">
        <thead>
          <tr class="cart-product-title">
            <th class="td-check">
              <input type="checkbox" class="check-span fl check-all" :class="{'check-true':isSelectAll}" @click="selectProduct(isSelectAll)" :checked="isSelectAll" id="checkAll">全选
            </th>
            <th class="td-product">商品</th>
            <th class="td-num">数量</th>
            <th class="td-price">单价(元)</th>
            <th class="td-total">金额(元)</th>
            <th class="td-do">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in productList" :key="index">
            <td class="td-check"><input type="checkbox" class="check-span" @click="item.select=!item.select" :class="{'check-true':item.select}" :checked="item.select"></td>
            <td class="td-product">
              <img :src="item.skuPic" width="98" height="98">
              <div class="product-info">
                <h3><router-link :to="{path:'product/detail', query: {'skuId':item.skuId}}" :title="item.skuName">{{item.skuName}}</router-link></h3>
                <p>品牌：{{item.spuBrand}}</p>
                <p v-for="(attr, index) in JSON.parse(item.skuAttrsVals)" :key="index">{{attr.attrName}}:{{attr.attrValue}}</p>
              </div>
              <div class="clearfix"></div>
            </td>
            <td class="td-num">
              <div class="product-num">
                <!-- <a href="javascript:;" class="num-reduce num-do fl" @click="changeQuantity(item.id, parseInt(item.skuQuantity) - 1)"><span></span></a>
                <input type="text" disabled class="num-input" v-model="item.skuQuantity" @blur="changeQuantity(item.id, parseInt(item.skuQuantity))">
                <a href="javascript:;" class="num-add num-do fr" @click="changeQuantity(item.id, parseInt(item.skuQuantity) + 1)"><span></span></a> -->
                <el-input-number v-model="item.skuQuantity" @change="changeQuantity($event,item.id)" :min="1" :max="999" size="mini"></el-input-number>
              </div>
            </td>
            <td class="td-price">
              <p class="red-text">￥<span class="price-text">{{item.skuPrice.toFixed(2)}}</span></p>
            </td>
            <td class="td-total">
              <p class="red-text">￥<span class="total-text">{{(item.skuPrice*item.skuQuantity).toFixed(2)}}</span></p>
            </td>
            <td class="td-do">
              <el-popconfirm @confirm="deleteOneProduct(item.id)" confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red" title="移出购物车">
                <el-button slot="reference" type="warning" size="mini" plain>删除</el-button>
              </el-popconfirm>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cart-product-info">
      <a class="delect-product" href="javascript:;" @click="deleteProduct">移除所选商品</a>
      <router-link class="keep-shopping" to="/product/list">继续购物</router-link>
      <a to="/orderConfirm" class="btn-buy fr"  href="javascript:;" @click="orderConfirm">去结算</a>
      <p class="fr product-total">￥<span>{{getTotal.totalPrice.toFixed(2)}}</span></p>
      <p class="fr check-num"><span>{{getTotal.totalNum}}</span>件商品总计（不含运费）：</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      visible: false,
      loading: false,
      productList: []
    }
  },
  computed: {
    isSelectAll: function () {
      // 如果productList中每一条数据的select都为true，返回true，否则返回false;
      return this.productList.every(function (val) {
        return val.select
      })
    },
    getTotal: function () {
      // 获取productList中select为true的数据。
      var _proList = this.productList.filter(function (val) {
        return val.select
      })
      var totalPrice = 0
      for (var i = 0, len = _proList.length; i < len; i++) {
        // 总价累加
        totalPrice += _proList[i].skuQuantity * _proList[i].skuPrice
      }
      // 选择产品的件数就是_proList.length，总价就是totalPrice
      return { totalNum: _proList.length, totalPrice: totalPrice }
    }
  },
  watch: {},
  methods: {
    getCartList () {
      this.loading = true
      const token = this.$cookie.get('token')
      this.$http({
        url: this.$http.adornUrl('/member/cartinfo/getListByMemberId'),
        method: 'get',
        headers: {
          token: token
        },
        params: this.$http.adornParams({})
      })
        .then(({ data }) => {
          if (data && data.code === 0) {
            this.$notify({
              title: '获取数据成功',
              type: 'success',
              duration: 1500
            })
            this.productList = data.shoppingCart
            console.log(data.shoppingCart)
            const cart = this.productList.map(item => {
              return item.id
            })
            this.$store.commit('user/updateCart', cart)
            // 为productList添加select（是否选中）字段，初始值为true
            var _this = this
            // 为productList添加select（是否选中）字段，初始值为true
            this.productList.map(function (item) {
              _this.$set(item, 'select', true)
            })
          } else {
            this.$notify({
              title: data.code,
              message: data.msg,
              type: 'error',
              duration: 1500
            })
          }
        })
        .catch(() => {
          this.$notify({
            title: '网络错误',
            type: 'error',
            duration: 1500
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    selectProduct: function (_isSelect) {
      // 遍历productList，全部取反
      for (var i = 0, len = this.productList.length; i < len; i++) {
        this.productList[i].select = !_isSelect
      }
    }, // 删除已经选中(select=true)的产品
    deleteProduct: function () {
      const ids = this.productList
        .filter((item) => {
          return item.select
        })
        .map((item) => {
          return item.id
        })
      if (ids.length === 0) {
        this.$notify.warning({
          title: '请先选中商品',
          duration: 1500
        })
        return
      }

      this.$confirm('是否删除所选商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/member/cartinfo/delete'),
          method: 'post',
          headers: {
            token: this.$cookie.get('token')
          },
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.getCartList()
            this.$notify({
              title: '删除成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$notify({
              title: data.code,
              message: data.msg,
              type: 'error',
              duration: 1500
            })
          }
        }).catch(() => {})
      })
    },

    // 删除单条产品
    deleteOneProduct: function (id) {
      this.$http({
        url: this.$http.adornUrl('/member/cartinfo/delete'),
        method: 'post',
        headers: {
          token: this.$cookie.get('token')
        },
        data: this.$http.adornData([id], false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.getCartList()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 1500
          })
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
    check: function (event, index) {
      if (event.target.value === '') {
        this.productList[index].skuQuantity = 0
      }
    },
    // 改变购物车商品数量
    changeQuantity: function (val, id) {
      const data = {
        id: id,
        skuQuantity: val
      }

      this.$http({
        url: this.$http.adornUrl('/member/cartinfo/update'),
        method: 'post',
        headers: {
          token: this.$cookie.get('token')
        },
        data: this.$http.adornData(data, false)
      }).then((data) => {
        this.getCartList()
      })
    },
    orderConfirm () {
      const ids = this.productList.filter(item => { return item.select }).map(item => item.id)
      if (ids.length > 0) {
        this.$cookie.set('payList', ids)
        this.$router.push('/orderConfirm')
      } else {
        this.$notify({
          title: '至少选择一项',
          type: 'error'
        })
      }
    }
  },
  created () {
    this.getCartList()
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
<style src="../style/css/shopping-cart.css" scoped>
.el-notification__icon {
  margin: 0;
}
</style>
