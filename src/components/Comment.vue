<template>
  <div class="comment">
    <div class="comment-item">
      <div class="user-column">
        <div class="user-info"> <img :src="comment.memberIcon" width="25" height="25" alt="c***9" class="avatar"> {{comment.memberNickName}} </div>
        <div class="user-level"> <span style="color: rgb(136, 136, 136);"></span> </div>
      </div>
      <div class="comment-column">
        <div class="comment-star">
          <el-rate v-model="comment.star" disabled show-score text-color="#ff9900" score-template="{value}" />
        </div>
        <div class="comment-content">
          {{comment.content}}
        </div>
        <div class="pic-list">
          <a v-for="(img, index) in images" :key="index">
            <el-image class="small-img" :src="img" style="width:70px; height:70px" :preview-src-list="images" />
          </a>
        </div>
        <div class="comment-message">
          <div class="order-info">
            <span v-for="(attr, index) in JSON.parse(comment.spuAttributes)" :key="index">{{attr.attrValue}}</span>
            <span>{{comment.createTime}}</span>
          </div>
          <div class="clear"></div>
          <div class="comment-op">
            <a class="J-nice"><i class="iconfont icon-praise_fill"></i>{{comment.likesCount}}</a>
            <a class="J-nice"><i class="iconfont icon-message_fill"></i>{{comment.replyCount}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {
    images () {
      if (this.comment.resources) {
        return JSON.parse(this.comment.resources)
      } else {
        return '[]'
      }
    }
  },
  watch: {},
  methods: {},
  created () {
    console.log(this.comment)
  }
}
</script>
<style scoped>
/* 评论*/
.clear {
  clear: both;
}
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
  content: '.';
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
