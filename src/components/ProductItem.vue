<template>
  <div>
    <p class="da">
      <a href="#" title="购买AppleCare+，获得原厂2年整机保修(含电池)，和多达2次意外损坏的保修服务。购买勾选：保障服务、原厂保2年。">
        <img src="../style/img/57d0d400nfd249af4.jpg" class="dim">
      </a>
    </p>
    <ul class="tab_im">
      <li><a href="#" title="黑色"><img src="../style/img/57d0d400nfd249af4.jpg"></a></li>
      <li><a href="#" title="黑色"><img src="../style/img/57d11c33N5cd57490.jpg"></a></li>
      <li><a href="#" title="黑色"><img src="../style/img/58d1d078N20e18b62.jpg"></a></li>
      <li><a href="#" title="黑色"><img src="../style/img/57d11b6cn1fd1194d.jpg"></a></li>
      <li><a href="#" title="黑色"><img src="../style/img/57d11c72N093250ec.jpg"></a></li>
      <!--               <li><a href="#" title="粉色"><img src="../style/img/57d11c33N5cd57490.jpg"></a></li>
              <li><a href="#" title="红色"><img src="../style/img/58d1d078N20e18b62.jpg"></a></li>
              <li><a href="#" title="黑色"><img src="../style/img/57d11b6cN1fd1194d.jpg"></a></li>
              <li><a href="#" title="白色"><img src="../style/img/57d11c72N093250ec.jpg"></a></li> -->
    </ul>
    <p class="tab_R">
      <span>¥5199.00</span>
      <span>¥5299.00</span>
      <span>¥5399.00</span>
      <span>¥6388.00</span>
      <span>¥5599.00</span>
    </p>

    <p class="tab_JE">
      <a href="#" title="购买AppleCare+，获得原厂2年整机保修(含电池)，和多达2次意外损坏的保修服务。购买勾选：保障服务、原厂保2年。">
        Apple iPhone 7 Plus (A1661) 32G 黑色 移动联通电信4G手机
      </a>
      <a href="#" title="购买AppleCare+，获得原厂2年整机保修(含电池)，和多达2次意外损坏的保修服务。购买勾选：保障服务、原厂保2年。">
        Apple iPhone 7 Plus (A1661) 32G 玫瑰金色 移动联通电信4G手机
      </a>
      <a href="#" title="购买AppleCare+，获得原厂2年整机保修(含电池)，和多达2次意外损坏的保修服务。购买勾选：保障服务、原厂保2年。">
        Apple iPhone 7 Plus 128G 红色特别版 移动联通电信4G手机
      </a>
      <a href="#" title="购买AppleCare+，获得原厂2年整机保修(含电池)，和多达2次意外损坏的保修服务。购买勾选：保障服务、原厂保2年。">
        Apple iPhone 7 Plus (A1661) 32G 亮黑色 移动联通电信4G手机
      </a>
      <a href="#" title="购买AppleCare+，获得原厂2年整机保修(含电池)，和多达2次意外损坏的保修服务。购买勾选：保障服务、原厂保2年。">
        Apple iPhone 7 Plus (A1661) 32G 银色 移动联通电信4G手机
      </a>
    </p>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {
    $('.tab_im img').hover(function () {
      var a = $(this).prop('src')
      var index = $(this).parents('li').index()
      $(this)
        .parents('li')
        .css('border', '1.5px solid red')
        .siblings('li')
        .css('border', '1.5px solid #ccc')
      $(this).parents('ul').prev().find('img').prop('src', a)
      $(this)
        .parents('ul')
        .siblings('.tab_JE')
        .find('a')
        .eq(index)
        .css('display', 'block')
        .siblings('a')
        .css('display', 'none')
      $(this)
        .parents('ul')
        .siblings('.tab_R')
        .find('span')
        .eq(index)
        .css('display', 'block')
        .siblings('span')
        .css('display', 'none')
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
<style scoped>
div:hover {
  box-shadow: 0 0 1px 0.5px #666;
}

div {
  padding: 10px 5px;
  height: 405px;
  width: 265px;
  box-sizing: border-box;
}

div > .da {
  text-align: center;
}

div > .da img {
  width: 250px;
  height: 260px;
}
div > ul {
  overflow: hidden;
  text-align: center;
  margin-left: 10px;
  margin-top: 10px;
}

div > ul li:first-child {
  border: 1.5px solid rgb(255, 50, 50);
}

div > ul li {
  overflow: hidden;
  margin-right: 3px;
  border: 1.5px solid #ccc;
  box-sizing: border-box;
  float: left;
}

div > ul li img {
  margin: 4px;
  float: left;
  width: 30px;
  height: 30px;
}

div .tab_R {
  color: red;
  font-size: 18px;
  font-weight: 800;
  margin: 10px;
}

div .tab_R span {
  display: none;
}
div .tab_R span:first-child {
  display: block;
}

div .tab_JE {
  margin: 10px;
}

div .tab_JE a {
  display: none;
  color: #666;
  font-size: 14px;
  font-weight: bold;
  height: 18px;
}

div .tab_JE a:hover {
  color: red;
}

div .tab_JE a:first-child {
  display: block;
}
</style>
