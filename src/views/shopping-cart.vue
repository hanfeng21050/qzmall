<template>
  <div class="page-shopping-cart" id="shopping-cart">
    <h4 class="cart-title">购物清单</h4>
    <div class="cart-product clearfix">
      <table>
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
              <img :src="item.image" width="98" height="98">
              <div class="product-info">
                <h3><a :title="item.pro_name">{{item.skuName}}</a></h3>
                <p>品牌：{{item.spuBrand}}</p>
                <p v-for="(attr, index) in item.skuAttrsVals" :key="index">{{attr.attrName}}:{{attr.attrValue}}</p>
              </div>
              <div class="clearfix"></div>
            </td>
            <td class="td-num">
              <div class="product-num">
                <a href="javascript:;" class="num-reduce num-do fl" @click="minus(index)"><span></span></a>
                <input type="text" class="num-input" v-model="item.count" @input="search($event,index)" @blur="check($event,index)">
                <a href="javascript:;" class="num-add num-do fr" @click="add(index)"><span></span></a>
              </div>
            </td>
            <td class="td-price">
              <p class="red-text">￥<span class="price-text">{{item.price.toFixed(2)}}</span></p>
            </td>
            <td class="td-total">
              <p class="red-text">￥<span class="total-text">{{(item.price*item.count).toFixed(2)}}</span></p>
            </td>
            <td class="td-do"><a href="javascript:;" class="product-delect" @click="deleteOneProduct(index)">删除</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cart-product-info">
      <a class="delect-product" href="javascript:;" @click="deleteProduct">删除所选商品</a>
      <a class="keep-shopping" href="#">继续购物</a>
      <a class="btn-buy fr" href="javascript:;">去结算</a>
      <p class="fr product-total">￥<span>{{getTotal.totalPrice}}</span></p>
      <p class="fr check-num"><span>{{getTotal.totalNum}}</span>件商品总计（不含运费）：</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      productList: [
        {
          skuId: 1,
          skuName: 'iphone12',
          spuBrand: 'Apple',
          image: require('../style/img/test1.jpg'), // 图片链接
          count: 3, // 数量
          price: 800, // 单价
          skuAttrsVals: [
            {
              attrName: '颜色',
              attrValue: '红色'
            },
            {
              attrName: '版本',
              attrValue: '64GB'
            }
          ]
        },
        {
          skuId: 1,
          brandId: 1,
          spuBrand: 'Apple',
          skuName: 'iphone12',
          image: require('../style/img/test1.jpg'), // 图片链接
          count: 3, // 数量
          price: 800, // 单价
          skuAttrsVals: [
            {
              attrName: '颜色',
              attrValue: '红色'
            },
            {
              attrName: '版本',
              attrValue: '64GB'
            }
          ]
        }
      ]
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
        totalPrice += _proList[i].count * _proList[i].price
      }
      // 选择产品的件数就是_proList.length，总价就是totalPrice
      return { totalNum: _proList.length, totalPrice: totalPrice }
    }
  },
  watch: {},
  methods: {
    selectProduct: function (_isSelect) {
      // 遍历productList，全部取反
      for (var i = 0, len = this.productList.length; i < len; i++) {
        this.productList[i].select = !_isSelect
      }
    }, // 删除已经选中(select=true)的产品
    deleteProduct: function () {
      this.productList = this.productList.filter(function (item) {
        return !item.select
      })
    },
    // 删除单条产品
    deleteOneProduct: function (index) {
      // 根据索引删除productList的记录
      this.productList.splice(index, 1)
    },
    search: function (event, index) {
      const flag = new RegExp('^[1-9]([0-9])*$').test(event.target.value)
      if (!flag) {
        this.productList[index].count = ''
      }
    },
    check: function (event, index) {
      if (event.target.value === '') {
        this.productList[index].count = 0
      }
    },
    // 数量增加
    add: function (index) {
      this.productList[index].count++
    },
    // 数量减少
    minus: function (index) {
      if (this.productList[index].count > 0) {
        this.productList[index].count--
      } else {
        this.productList[index].count = 0
      }
    }
  },
  created () {
    this.$notify.error({
      title: '请先登录!',
      type: 'error',
      duration: 0
    })
  },
  mounted () {
    // 为productList添加select（是否选中）字段，初始值为true
    var _this = this
    // 为productList添加select（是否选中）字段，初始值为true
    this.productList.map(function (item) {
      _this.$set(item, 'select', true)
    })
  },
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
.el-notification__icon{
  margin: 0;
}
</style>
