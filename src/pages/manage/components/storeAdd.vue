<template>
  <div class="wrap">
     <div class="content">
       <div class="textWrap">
         进货数量：<input class="text" v-model="num" /> {{product.unit}}
       </div>
       <div class="closeButton" @click="closeDialog">×</div>
       <div class="saveButton" @click="storeAdd">录入</div>
     </div>
  </div>
</template>

<script>
  // 创建数据库链接
  const db = wx.cloud.database()
  const product = db.collection('product')
  export default {
    data () {
      return {
        num: ''
      }
    },
    props: {
      product: {
        type: Object,
        default: () => {}
      }
    },
    onLoad () {
    },
    methods: {
      // 关闭对话框
      closeDialog () {
        this.$emit('close')
      },
      // 库存录入
      storeAdd () {
        const _ = db.command
        product.doc(this.product._id).update({
          data: {
            store: _.inc(+this.num)
          }
        }).then((res) => {
          wx.showToast({title: '录入成功！'})
          this.$emit('close', true)
        })
      }
    }
  }
</script>
<style scoped>
  .wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content{
    width: 710rpx;
    padding: 40rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
    background: #fff;
    position: relative;
    margin-bottom: 25vh;
  }
  .text {
    width: 400rpx;
    height: 100rpx;
    margin: 20rpx 0;
    /*border: 1px solid #37B3FF;*/
    border: 1px solid #e5e5e5;
    padding: 20rpx;
    box-sizing: border-box;
  }
  .textWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20rpx 0;
    font-size: 16px;
  }
  .closeButton {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    top:-15rpx;
    right: -15rpx;
    background: #f43d41;
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .saveButton {
    width: 630rpx;
    height: 100rpx;
    border-radius: 8rpx;
    background: #37B3FF;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
