<template>
  <div class="mycomment-form">
    <div class="f-item">
      <div class="fi-info">
        <div class="comment-goods">
          <div class="p-img">
            <a>
              <img :src="orderItem.skuPic" alt="">
            </a>
          </div>
          <div class="p-name">
            <a>{{orderItem.skuName}}</a>
          </div>
          <div class="p-price"><strong>¥{{orderItem.skuPrice * orderItem.skuQuantity}}</strong></div>
          <div class="p-attr" v-for="(attr, index) in JSON.parse(skuAttrsVals)" :key="index">{{attr.attrName}}: {{attr.attrValue}}</div>

        </div>
      </div>
      <div class="fi-operate">
        <div class="fop-star">
          <div class="fop-label">商品评分</div>
          <div class="fop-main">
            <el-rate v-model="commentForm.star" show-score score-template='{value}分'></el-rate>
          </div>
        </div>

        <div class="fop-item">
          <div class="fop-label">商品评分</div>
          <div class="fop-main">
            <el-input type="textarea" :rows="5" show-word-limit maxlength="500" placeholder="请输入内容" v-model="commentForm.content">
            </el-input>
          </div>
        </div>
        <div class="comment-imgs">
          <div class="fop-label">商品评分</div>
          <div class="fop-main">
            <multi-upload ref="decript" v-model="commentForm.images" :maxCount="9"></multi-upload>
          </div>
        </div>
      </div>
    </div>

    <div class="f-btnbox">
      <el-button type="warning" class="btn" @click="published">发表</el-button>
    </div>
  </div>
</template>

<script>
import MultiUpload from '@/components/multiUpload'
export default {
  components: {
    MultiUpload
  },
  data () {
    return {
      orderItem: {},
      commentForm: {
        skuId: undefined,
        orderItemId: undefined,
        star: 0,
        content: '',
        skuAttrsVals: '',
        images: []
      }
    }
  },
  computed: {
    skuAttrsVals () {
      // 判断一下是否为空, 防止json.parse方法报错
      if (this.orderItem.skuAttrsVals) {
        return this.orderItem.skuAttrsVals
      } else {
        return '[]'
      }
    }
  },
  watch: {},
  methods: {
    getOrderItem (id) {
      this.$http({
        url: this.$http.adornUrl('/order/orderitem/info/' + id),
        method: 'get',
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        if (data && data.code === 0) {
          const { orderItem } = data
          this.orderItem = orderItem
          console.log(this.orderItem)
          this.$notify({
            title: '获取数据成功',
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

    published () {
      this.commentForm.skuId = this.orderItem.skuId
      this.commentForm.orderItemId = this.orderItem.id
      this.commentForm.skuAttrsVals = this.orderItem.skuAttrsVals

      this.$http({
        url: this.$http.adornUrl('/product/spucomment/published'),
        method: 'post',
        data: this.$http.adornData(this.commentForm, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$notify({
            title: '评论成功',
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
    }
  },
  created () {
    this.$store.commit('user/updateUserMenuTitle', '商品评价')
    const orderItemId = this.$route.query.orderItemId
    this.getOrderItem(orderItemId)
  }
}
</script>
<style scoped>
.mycomment-form {
  width: 100%;
  overflow: hidden;
}
.mycomment-form .f-item {
  border-top: 1px solid #e4e4e4;
  margin-top: -1px;
  margin-bottom: 1px;
  overflow: hidden;
  background: #fff;
  font-family: verdana, '5b8b/4f53;';
  display: flex;
}
.mycomment-form .fi-info {
  width: 322px;
  _display: inline;
}
.comment-goods {
  padding: 55px 50px;
}
.comment-goods .p-img {
  width: 100%;
  height: 100px;
  margin-bottom: 15px;
  text-align: center;
}
.comment-goods .p-img img {
  width: 100px;
  height: 100px;
}
.comment-goods .p-name,
.comment-goods .p-price {
  width: 100%;
  line-height: 20px;
  margin-bottom: 10px;
  text-align: center;
}
.comment-goods .p-attr {
  width: 100%;
  line-height: 20px;
  text-align: center;
  color: #999;
}
.mycomment-form .fi-operate {
  overflow: hidden;
  flex: 1;
  border-left: 1px solid #f5f5f5;
  padding: 30px 40px 0;
  position: relative;
  z-index: 1;
}

.fi-operate .fop-star,
.fop-item {
  display: flex;
  padding-top: 30px;
}

.fi-operate .fop-label {
  width: 100px;
  height: 16px;
  line-height: 16px;
  margin-right: 20px;
}

.fi-operate .fop-main {
  flex: 1;
}

.comment-imgs {
  margin-top: 30px;
  display: flex;
}

.mycomment-form .f-btnbox {
  position: relative;
  width: 100%;
  height: 48px;
  padding: 30px 0;
  text-align: center;
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 40px;
}

.mycomment-form .f-btnbox .btn {
  width: 220px;
  height: 48px;
}
</style>
