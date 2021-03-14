<template>
  <div class="comment">
    <div class="comment-item">
      <div class="user-column">
        <div class="user-info"> <img src="//misc.360buyimg.com/user/myjd-2015/css/i/peisong.jpg" width="25" height="25" alt="c***9" class="avatar"> c***9 </div>
        <div class="user-level"> <span style="color: rgb(136, 136, 136);"></span> </div>
      </div>
      <div class="comment-column">
        <div class="comment-star">
          <el-rate v-model="starValue" disabled show-score text-color="#ff9900" score-template="{value}" />
        </div>
        <div class="comment-content">
          一代经典，小米10至尊纪念版真的是名不虚传，太漂亮了，做工也非常不错，这次是真的有旗舰机的风范了！拍照效果一流，变焦拍照也很清晰，功能丰富，很好！更详细的功能还在体验中！边学习边用！屏幕不说了，安卓数一数二的屏幕，雷总也夸了半天，立体声扬声器加持，音效也是杠杠的专业级屏幕，关键是实惠了九/佰来块，去锼他微就行，就是p和ro再86再4这六个哦！我很喜欢！不过能2K更好，但是会耗电，双扬声器，音效尚可，这次采用的国产屏幕接近三星的屏幕素质了，但是整体显示效果也非常棒，加上120hz的高刷新率整个显示效果又提升了，毋庸置疑的要入手小米10至尊版，120W的快充，120赫兹的刷新率，引领手机前端，所以就第一时间交了定金，只盼付尾款快些拿货，给力的全家桶，给力的配置，给力的小米，给力的物流，全部值得推荐！充13分半充满，前面一分钟8电，5分钟40电，按比例算17分钟可以充满，用了一段时间，内存变大，好像之前天气热的时候要长点，现在一般也和官方说的速度差不多，些充电速度确实舒服，之前用多大小米8，用了2年换这个，这个太香了，希望下次换手机还换小米，希望能越做越好，下次换想要更快充电速度，各种数码
        </div>
        <div class="pic-list">
          <a>
            <el-image class="small-img" :src="url" width="48" height="48" :preview-src-list="srcList" />
          </a>
        </div>
        <div class="comment-message">
          <div class="order-info">
            <span>流影紫</span>
            <span>6GB+128GB</span>
            <span>2020-12-09 15:03</span>
          </div>
          <div class="clear" ></div>
          <div class="comment-op">
            <a class="J-nice"><i class="iconfont icon-praise_fill"></i>108</a>
            <a class="J-nice"><i class="iconfont icon-message_fill"></i>108</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      starValue: 5,
      url:
        '//img30.360buyimg.com/n0/s48x48_jfs/t1/161617/34/10873/75228/60460009E60dc9df7/e48039812b08a13e.jpg',
      srcList: [
        '//img30.360buyimg.com/n0/s48x48_jfs/t1/161617/34/10873/75228/60460009E60dc9df7/e48039812b08a13e.jpg'
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {}
}
</script>
<style scoped>
/* 评论*/
.clear{ clear:both}
.comment .comment-item {
  zoom: 1;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}
.comment .comment-item .user-column {
  width: 140px;
  float: left;
}
.comment .comment-item .user-info {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.comment .comment-item .user-info img {
  border-radius: 50%;
  margin-right: 5px;
}
.comment .comment-item .user-level {
  padding-top: 3px;
}
.comment .comment-item .comment-column {
  margin-left: 150px;
}
.comment .comment-item .comment-star {
  width: 150px;
  height: 14px;
}
.comment .comment-item .comment-content {
  font-size: 14px;
  padding: 10px 0;
  line-height: 180%;
  color: #333;
}
.comment .comment-item .pic-list {
  padding-bottom: 15px;
}
.comment .comment-item .pic-list .small-img {
  border: 1px solid #e2e2e2;
  padding: 1px;
  margin-right: 6px;
}

.comment .comment-message:after {
    content: ".";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
}

.comment .comment-item .order-info {
  float: left;
  color: #999;
  font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
    '\u5b8b\u4f53', sans-serif;
}
.comment .comment-item .order-info span {
  margin-right: 20px;
}
.comment .comment-item .order-info span:last-child {
  display: block;
}

.comment .comment-item .comment-op {
  float: right;
}
.comment .comment-item .comment-op a {
  display: inline-block;
  margin-left: 25px;
  color: #666;
}
</style>
