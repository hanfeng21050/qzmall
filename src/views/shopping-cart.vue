<template>
  <div>
    <div class="shopcart-body" v-if='isShow'>
      <section class="cart-main">
        <header class="head">
          <nav class="cart-nav flex-vc">
            <div class="check-all row-5 margin0">
              <div class="check-wrapper"> <a href="javascript:;" class="check-ctrl" :class={checked:isSelectedAll} @click='checkAll'> <i class="icon-check"> <span></span> </i> <span
                    class="name-check">全选</span> </a>
              </div>
            </div>
            <div class="singal-price row-2"> 单价（元） </div>
            <div class="number row-2"> 数量 </div>
            <div class="small-total row-2"> 小计（元） </div>
            <div class="edit row-1" @click='toggleEdit'> <span v-text='isEdit ? "编辑" : "完成"'></span> </div>
          </nav>
        </header>
        <section class="body">
          <div class="area" v-for="(kind) of goodsInfo" :key="kind.key">
            <div class="area-category">
              <div class="check-wrapper"> <a href="javascript:;" class="check-ctrl" :class={checked:kind.isSelected} @click='checkCategory(kind)'> <i class="icon-check"> <span></span> </i> <span
                    class="name-check">{{kind.category}}</span> </a> </div>
            </div>
            <ul class="area-list">
              <li class="item flex-wrap" v-for="(item , index) of kind.goods" :key="item.name">
                <div class="option flex-vc row-5">
                  <div class="check-wrapper"> <a href="javascript:;" class="check-ctrl" :class={checked:item.isSelected} @click='checkSingal(kind ,item)'> <i class="icon-check"> <span></span> </i>
                    </a> </div>
                  <div class="img"> <a href="javascript:;"> <img :src="item.imgUrl" alt=""> </a> </div>
                  <div class="good-info"> <a href="javascript:;">
                      <h5 class="good-name">{{item.name}}</h5>
                      <p class="good-desc">{{item.tips}}</p>
                    </a> </div>
                </div>
                <div class="singal-price row-2 flex-hvc"> {{item.price | polish }} </div>
                <div class="number row-2 flex-hvc">
                  <div class="flex-wrap input-box">
                    <button class="minus" :class="{'forbid':item.isBanMinus}" @click="minus(item)">-</button>
                    <input class="num-input" type="text" :value=item.selectNum @keyup="inputVerify(item,$event)">
                    <button class="plus" :class="{'forbid':item.isBanPlus}" @click="plus(item)">+</button>
                    <em class="upper-limit">限购<span>{{item.upperLimit}}</span>件</em>
                  </div>
                </div>
                <div class="small-total row-2 flex-hvc"> {{item.price * item.selectNum | polish()}} </div>
                <div class="edit row-1 flex-hvc"> <i class="edit-icon" v-show="isEdit">--</i> <i class="close-btn" v-show="!isEdit" @click="alertDelConfirm(kind,index)"> <span
                      class="shift-left"></span> <span class="shift-right"></span> </i> </div>
              </li>
            </ul>
          </div>
        </section>
      </section>
      <footer class="cart-foot-wrap">
        <div class="foot flex-vc">
          <div class="foot-left flex-vc margin0">
            <div class="check-wrapper"> <a href="javascript:;" class="check-ctrl" :class={checked:isSelectedAll} @click='checkAll'> <i class="icon-check"> <span></span> </i> <span
                  class="name-check">全选</span> </a>
            </div>
            <div class="desc"> <span class="del-selected" @click="alertDelConfirm">删除选中商品</span> <em class="num-desc">
                共有 <span class="sum"> {{sum}} </span> 件商品，已选择 <span class="sumed"> {{sumed}} </span> 件 </em> </div>
          </div>
          <div class="foot-right flex-vc margin0">
            <div class="total-price"> 合计： <span class="totaled"> {{totaled | polish}} </span> </div>
            <a href="javascript:;" class="order flex-hvc" :class='{"none-order":isNoOrder}'> 去结算 </a>
          </div>
        </div>
      </footer>
      <!-- <del-confirm ref="delConfirm" @del-goods="deleteOk"></del-confirm> -->
    </div>
    <div class="shopcart-null flex-hvc" v-else> <i class="shopcart-icon"></i>
      <div class="tips">
        <h3 class="tips-substitle"> 购物车内还没有商品，赶紧去选购吧~~ </h3>
        <a href="javascript:;" class="back-home flex-hvc"> 返回商城首页 </a>
      </div>
    </div>
  </div>
</template>

<script>
import '@/style/iconfont/iconfont.css'
export default {
  components: {},
  data () {
    return {
      goodsInfo: [
        {
          category: '声学',
          key: 'acoustics',
          goods: [
            {
              id: 1,
              name: 'MEIZU UR 高端定制耳机',
              tips: '十单元 8699起',
              price: 8699,
              selectNum: 1,
              imgUrl: require('../style/img/p1.png'),
              isSelected: true,
              upperLimit: 2
            },
            {
              id: 10,
              name: '魅族 POP2 真无线蓝牙耳机',
              tips: '皓月白',
              price: 399,
              selectNum: 2,
              imgUrl: require('../style/img/p6.png'),
              isSelected: false,
              upperLimit: 3
            }
          ]
        },

        {
          category: '手机',
          key: 'smartPhone',
          goods: [
            {
              id: 2,
              name: '魅族 16Xs',
              tips: '全网通公开版 珊瑚橙 6+64GB',
              price: 1499,
              selectNum: 2,
              imgUrl: require('../style/img/p2.png'),
              isSelected: true,
              upperLimit: 3
            },
            {
              id: 3,
              name: '魅族 16s',
              tips: '全网通公开版 凝光白 6+128GB',
              price: 2699,
              selectNum: 1,
              imgUrl: require('../style/img/p3.png'),
              isSelected: false,
              upperLimit: 4
            },
            {
              id: 4,
              name: '魅族 16s Pro',
              tips: '全网通公开版 黑之秘境 8+128GB',
              price: 2999,
              selectNum: 2,
              imgUrl: require('../style/img/p4.png'),
              isSelected: true,
              upperLimit: 10
            },
            {
              id: 5,
              name: '魅族 16T',
              tips: '全网通公开版 湖光绿 8+256GB',
              price: 2499,
              selectNum: 5,
              imgUrl: require('../style/img/p5.png'),
              isSelected: false,
              upperLimit: 5
            }
          ]
        }
      ],
      isSelectedAll: false,
      isEdit: true,
      willDelSingal: null,
      isShow: true,
      DOMEle: null,
      DOMInfo: null
    }
  },
  filters: {
    polish (val, num) {
      num = num || 2
      return '￥' + val.toFixed(num)
    }
  },
  computed: {
    // 总件数
    sum () {
      return this.goodsInfo.reduce((init, now) => {
        const num = now.goods.reduce((init, item) => {
          return init + item.selectNum
        }, 0)
        return init + num
      }, 0)
    },

    // 已选择
    sumed () {
      return this.goodsInfo.reduce((init, now) => {
        const numed = now.goods.reduce((init, item) => {
          return init + (item.isSelected ? item.selectNum : 0)
        }, 0)
        return init + numed
      }, 0)
    },

    // 合计
    totaled () {
      return this.goodsInfo.reduce((init, now) => {
        const singalTotal = now.goods.reduce((init, item) => {
          return init + (item.isSelected ? item.selectNum * item.price : 0)
        }, 0)
        return init + singalTotal
      }, 0)
    },

    // 是否结算
    isNoOrder () {
      return this.sumed === 0
    }
  },
  watch: {},
  methods: {
    // 自适应cart-foot的位置
    adjustFootSite () {
      const DOMInfo = this.DOMInfo
      const cartFootWrap = this.DOMEle.cartFootWrap

      if (
        DOMInfo.cartMainInfo.offsetTop +
          DOMInfo.cartMainInfo.height +
          DOMInfo.cartFootWrapInfo.height -
          DOMInfo.viewportH -
          DOMInfo.docScrollTop >
        0
      ) {
        cartFootWrap.classList.add(DOMInfo.cartFootWrapInfo.activeClass)
      } else {
        cartFootWrap.classList.remove(DOMInfo.cartFootWrapInfo.activeClass)
      }
    },

    // 初始化数量加减按钮样式
    initBtnStatus () {
      this.goodsInfo.forEach((e) => {
        e.goods.forEach((item) => {
          item.isBanMinus = item.selectNum <= 1
          item.isBanPlus = item.selectNum >= item.upperLimit
        })
      })
    },

    // 更新全选和某类商品全选按钮状态
    updateStatus () {
      const flagArr = this.goodsInfo.map((e) => {
        return (e.isSelected = e.goods.every((item) => item.isSelected))
      })

      this.isSelectedAll = flagArr.every((e) => {
        return e
      })
    },

    // 切换编辑/完成
    toggleEdit () {
      this.isEdit = !this.isEdit
    },

    // 全选
    checkAll () {
      this.isSelectedAll = !this.isSelectedAll

      this.goodsInfo.forEach((e) => {
        e.isSelected = this.isSelectedAll

        e.goods.forEach((item) => {
          item.isSelected = this.isSelectedAll
        })
      })
    },

    // 单个商品
    checkSingal (category, ele) {
      ele.isSelected = !ele.isSelected

      category.isSelected = category.goods.every((item) => item.isSelected)

      this.isSelectedAll = this.goodsInfo.every((e) => e.isSelected)
    },

    // 某一类商品
    checkCategory (ele) {
      ele.isSelected = !ele.isSelected

      this.isSelectedAll = this.goodsInfo.every((e) => e.isSelected)

      ele.goods.forEach((item) => {
        item.isSelected = ele.isSelected
      })
    },

    // 适应del-confirm框内容数据
    changeConfirmData (option) {
      const delConfirmObj = this.$refs.delConfirm
      delConfirmObj.isAlert = true

      if (option !== null) {
        delConfirmObj.confirmInfo = {
          title: '删除',
          content: '您确定删除该商品吗？',
          del: {
            delCon: '删除',
            isShow: true
          },
          cancelCon: '取消'
        }
      } else if (this.sumed !== 0) {
        delConfirmObj.confirmInfo = {
          title: '删除',
          content: '您确定要删除选中的商品吗？',
          del: {
            delCon: '确定',
            isShow: true
          },
          cancelCon: '取消'
        }
      } else {
        delConfirmObj.confirmInfo = {
          title: '提示',
          content: '亲~~ 请选择您要删除的商品！',
          del: {
            delCon: '',
            isShow: false
          },
          cancelCon: '确定'
        }
      }
    },

    // 弹出del-confrim框
    alertDelConfirm (kind, index) {
      this.willDelSingal =
        kind !== undefined && index !== undefined ? { kind, index } : null

      this.changeConfirmData(this.willDelSingal)
    },

    // 确定删除商品
    deleteOk () {
      const willDelSingal = this.willDelSingal

      if (willDelSingal !== null) {
        willDelSingal.kind.goods.splice(willDelSingal.index, 1)
      } else {
        this.goodsInfo.forEach((e) => {
          e.goods = e.goods.filter((item) => item.isSelected === false)
        })
      }

      this.goodsInfo = this.goodsInfo.filter((e) => e.goods.length !== 0)

      this.goodsInfo.length === 0 && (this.isShow = false)

      this.updateStatus()

      this.$nextTick(() => {
        this.DOMInfo.cartMainInfo.height = this.DOMEle.cartMain.offsetHeight
        this.adjustFootSite()
      })
    },

    setNumBtnState (item) {
      if (item.selectNum <= 1) {
        item.isBanMinus = true
        item.isBanPlus = false
      } else if (item.selectNum >= item.upperLimit) {
        item.isBanPlus = true
        item.isBanMinus = false
      } else {
        item.isBanMinus = false
        item.isBanPlus = false
      }
    },

    // 自减
    minus (item) {
      item.selectNum--
      item.selectNum <= 1 && (item.selectNum = 1)
      this.setNumBtnState(item)
    },

    // 自加
    plus (item) {
      item.selectNum++
      item.selectNum >= item.upperLimit && (item.selectNum = item.upperLimit)
      this.setNumBtnState(item)
    },

    inputVerify (item, ev) {
      item.timeOuter && clearTimeout(item.timeOuter)

      item.timeOuter = setTimeout(() => {
        let target = parseInt(ev.target.value.trim())

        if (target <= 1) {
          target = 1
        } else if (isNaN(target)) {
          target = 1
        } else if (target > item.upperLimit) {
          target = item.upperLimit
        }

        item.selectNum = ev.target.value = target

        this.setNumBtnState(item)
      }, 500)
    }
  },
  created () {
    this.updateStatus()
    this.initBtnStatus()
  },
  mounted () {
    this.$nextTick(() => {
      // 存储获取的DOM元素
      this.$data.DOMEle = {
        cartMain: document.querySelector('.cart-main'),
        cartFootWrap: document.querySelector('.cart-foot-wrap')
      }

      // 存储DOM相关信息
      this.$data.DOMInfo = {
        cartMainInfo: {
          offsetTop: this.DOMEle.cartMain.offsetTop,
          height: this.DOMEle.cartMain.offsetHeight
        },
        cartFootWrapInfo: {
          height: this.DOMEle.cartFootWrap.offsetHeight,
          activeClass: 'fixed'
        },
        docScrollTop:
          document.documentElement.scrollTop || document.body.scrollTop,
        viewportH: window.innerHeight
      }

      this.adjustFootSite()
      window.addEventListener('scroll', () => {
        this.DOMInfo.docScrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        this.adjustFootSite()
      })
      window.addEventListener('resize', () => {
        this.DOMInfo.viewportH = window.innerHeight
        this.adjustFootSite()
      })
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
<style scoped src="../style/css/shopping-cart.css">

</style>
