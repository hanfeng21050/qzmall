<template>
  <div class="s_content">
    <el-tabs type="border-card">
      <el-tab-pane label="全部订单">
        <table class="td-void order-tb">
          <thead>
            <tr>
              <th>
                订单详情
              </th>
              <th>收货人</th>
              <th>金额</th>
              <th>
                <div class="deal-state-cont" id="orderState">
                  <div class="state-txt">全部状态<b></b><span class="blank"></span></div>
                </div>
              </th>
              <th>操作</th>
            </tr>

          </thead>
          <tbody>
            <tr class="sep-row">
              <td colspan="5"></td>
            </tr>
            <tr class="tr-th">
              <td colspan="5">
                <span class="gap"></span>
                <span class="dealtime" title="2020-12-13 19:45:15">2020-12-13 19:45:15</span>
                <span class="number">
                  订单号：
                  <a name="orderIdLinks" id="idUrl139806054763" target="_blank" href="//details.jd.com/normal/item.action?orderid=139806054763&amp;PassKey=0413A10BE4CF1C6475AE70252F8FF1D6"
                    clstag="click|keycount|orderinfo|order_num">139806054763</a>
                </span>
              </td>
            </tr>
            <tr class="tr-bd">
              <td width="40%">
                <div class="goods-item">
                  <div class="p-img">
                    <a href="//item.jd.com/10023632209833.html" clstag="click|keycount|orderinfo|order_product" target="_blank">
                      <img class="" src="//img10.360buyimg.com/N6/s60x60_jfs/t1/140872/3/12885/296549/5f9eb1b0E0191056d/6346512cdec26e13.png" title="小米Redmi 红米K30S 至尊纪念版 双模5G手机 星际黑 8GB+128GB 官方标配"
                        data-lazy-img="done" width="60" height="60">
                    </a>
                  </div>
                  <div class="p-msg">
                    <div class="p-name"><a href="//item.jd.com/10023632209833.html" class="a-link" clstag="click|keycount|orderinfo|order_product" target="_blank"
                        title="小米Redmi 红米K30S 至尊纪念版 双模5G手机 星际黑 8GB+128GB 官方标配">小米Redmi 红米K30S 至尊纪念版 双模5G手机 星际黑 8GB+128GB 官方标配</a></div>

                  </div>
                  <p class="goods-number">
                    x1
                  </p>
                </div>
                <div class="clr"></div>
              </td>
              <td rowspan="2" width="15%">
                <div class="consignee tooltip">
                  <span class="txt">韩锋</span><b></b>
                  <div class="prompt-01 prompt-02">
                    <div class="pc">
                      <strong>韩锋</strong>
                      <p>贵州遵义市道真仡佬族苗族自治县玉溪镇植保站附近</p>
                      <p>137****2313</p>
                    </div>
                    <div class="p-arrow p-arrow-left"></div>
                  </div>
                </div>
              </td>
              <td rowspan="2" width="15%">
                <div class="amount">
                  <span>¥2877.98</span> <br>
                  <span class="ftx-13">在线支付</span>
                </div>
              </td>
              <td rowspan="2" width="15%">
                <div class="status">
                  <span class="order-status ftx-02">

                    等待收货

                  </span>
                  <br>
                  <router-link to="/user/orderDetail">订单详情</router-link>
                </div>
              </td>
              <td rowspan="2" width="15%">
                <div class="operate">
                  <a href="#none" class="btn-5 order-confirm" _oid="139806054763" _otype="22" _paytype="4" _shiptype="70">确认收货</a><br>
                  <a class="a-link order-cancel" href="javascript:void(0);" data-dialog-version="201707" _oid="139806054763" _passkey="DE12F97BDAF9CBBA91694D700B0BCCC4"
                    _url="new/2017/cancelQueRenShouHuoOrder.html?3&amp;cancalText=0&amp;priceProtection=0">取消订单</a><br>
                </div>
              </td>
            </tr>
            <tr class="tr-bd">
              <td width="40%">
                <div class="goods-item">
                  <div class="p-img">
                    <a href="//item.jd.com/10023632209833.html" clstag="click|keycount|orderinfo|order_product" target="_blank">
                      <img class="" src="//img10.360buyimg.com/N6/s60x60_jfs/t1/140872/3/12885/296549/5f9eb1b0E0191056d/6346512cdec26e13.png" title="小米Redmi 红米K30S 至尊纪念版 双模5G手机 星际黑 8GB+128GB 官方标配"
                        data-lazy-img="done" width="60" height="60">
                    </a>
                  </div>
                  <div class="p-msg">
                    <div class="p-name"><a href="//item.jd.com/10023632209833.html" class="a-link" clstag="click|keycount|orderinfo|order_product" target="_blank"
                        title="小米Redmi 红米K30S 至尊纪念版 双模5G手机 星际黑 8GB+128GB 官方标配">小米Redmi 红米K30S 至尊纪念版 双模5G手机 星际黑 8GB+128GB 官方标配</a></div>

                  </div>
                  <p class="goods-number">
                    x1
                  </p>
                </div>
                <div class="clr"></div>
              </td>
            </tr>

          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="待发货">待发货</el-tab-pane>
      <el-tab-pane label="待收货">待收货</el-tab-pane>
      <el-tab-pane label="待评价">待评价</el-tab-pane>
    </el-tabs>
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
<style src="@/style/css/user/order.css" scoped>
</style>
