<template>
  <div class="s_content">
    <div class="order-status">
      <el-steps :active="3" align-center finish-status="success">
        <el-step title="下单" description="2020-12-13 18:02"></el-step>
        <el-step title="付款" description="2020-12-13 18:02"></el-step>
        <el-step title="配货" description="2020-12-13 18:02"></el-step>
        <el-step title="出库" description="2020-12-13 18:02"></el-step>
        <el-step title="交易成功" description="2020-12-13 18:02"></el-step>
      </el-steps>
    </div>
    <div class="status-now">
      <ul>
        <li class="status-title">
          <h3>订单状态：已支付，待系统审核确认</h3>
        </li>
      </ul>
      <p class="realtime"><span>请耐心等待审核，审核结果将发送到您的邮箱，并且您所填写的捐赠数据将显示在捐赠表中。</span></p>
    </div>

    <div class="gray-sub-title cart-title">
      <div class="first">
        <div><span class="order-id">商品名称</span></div>
        <div class="f-bc"><span class="price">单价</span> <span class="num">数量</span>
          <span class="operation">小计</span>
        </div>
      </div>
    </div>

    <div class="goods-table">
      <div class="cart-items"><a class="img-box"><img alt="" src="https://resource.smartisan.com/resource/3973d009d182d8023bea6250b9a3959e.jpg"></a>
        <div class="name-cell ellipsis"><a title="" target="_blank">Smartisan 明信片</a></div>
        <div class="n-b">
          <div class="price">¥ 9.90</div>
          <div class="goods-num">1</div>
          <div class="subtotal"> ¥ 9.90</div>
        </div>
      </div>
      <div class="cart-items"><a class="img-box"><img src="https://resource.smartisan.com/resource/406eddef8808fa5a9be9594d07ef8643.jpg" alt=""></a>
        <div class="name-cell ellipsis"><a title="" target="_blank">ACIL E1 颈挂式蓝牙耳机</a></div>
        <div class="n-b">
          <div class="price">¥ 199.00</div>
          <div class="goods-num">2</div>
          <div class="subtotal"> ¥ 398.00</div>
        </div>
      </div>
      <div class="cart-items"><a class="img-box"><img src="https://resource.smartisan.com/resource/9c1d958f10a811df841298d50e1ca7c0.jpg" alt=""></a>
        <div class="name-cell ellipsis"><a title="" target="_blank">Smartisan 半入耳式耳机</a></div>
        <div class="n-b">
          <div class="price">¥ 89.00</div>
          <div class="goods-num">1</div>
          <div class="subtotal"> ¥ 89.00</div>
        </div>
      </div>
      <div class="cart-items"><a class="img-box"><img src="http://image.smartisanos.cn/resource/804b82e4c05516e822667a23ee311f7c.jpg" alt=""></a>
        <div class="name-cell ellipsis"><a title="" target="_blank">FIIL Diva Pro 全场景无线降噪耳机</a></div>
        <div class="n-b">
          <div class="price">¥ 1499.00</div>
          <div class="goods-num">1</div>
          <div class="subtotal"> ¥ 1499.00</div>
        </div>
      </div>
      <div class="cart-items"><a class="img-box"><img src="https://resource.smartisan.com/resource/804edf579887b3e1fae4e20a379be5b5.png" alt=""></a>
        <div class="name-cell ellipsis"><a title="" target="_blank">Smartisan T恤 任天堂发售“红白机”</a></div>
        <div class="n-b">
          <div class="price">¥ 149.00</div>
          <div class="goods-num">2</div>
          <div class="subtotal"> ¥ 298.00</div>
        </div>
      </div>
    </div>

    <div class="order-discount-line">
      <p style="font-size: 14px; font-weight: bolder;"><span style="padding-right: 47px;">商品总计：</span> <span style="font-size: 16px; font-weight: 500; line-height: 32px;">¥ 2293.9</span></p>
      <p><span style="padding-right: 30px;">运费：</span><span style="font-weight: 700;">+ ¥ 0.00</span></p>
      <p class="price-total"><span>应付金额：</span><span class="price-red">¥ 2293.9</span>
      </p>
    </div>

    <div class="gray-sub-title cart-title">
      <div class="first">
        <div><span class="order-id">收货信息</span></div>
      </div>
    </div>

    <div  style="height: 155px; padding: 20px 30px;">
      <p  class="address">姓名：123</p>
      <p  class="address">联系电话：123</p>
      <p  class="address">详细地址：123</p>
    </div>
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
<style src="@/style/css/user/order-detail.css" scoped>
</style>
