<template>
  <div class="wrap" :class="{warn: product.store < product.storeWarn}">
    <div class="name">{{product.name}}</div>
    <div class="store">{{product.store}}<span class="unit">{{product.unit}}</span></div>
    <div class="button" @click="distroyStore(product._id)">售出</div>
  </div>
</template>

<script>
  // 创建数据库链接
  const db = wx.cloud.database()
  const product = db.collection('product')
  export default {
    data () {
      return {
      }
    },
    props: {
      product: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      // 卖出 消库存
      distroyStore (id) {
        const _ = db.command
        product.doc(id).update({
          data: {
            store: _.inc(-1)
          }
        }).then(res => {
          this.product.store -= 1
        })
      }
    },
    onLoad () {
    }
  }
</script>
<style scoped>
  .wrap {
    width: 710rpx;
    height: 100rpx;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
  }
  .name {
    width: 450rpx;
  }
  .store{
    width: 160rpx;
    color: #666;
  }
  .unit{
    font-size: 14px;
    color:#999;
  }
  .button {
    width: 100rpx;
    height: 60rpx;
    border-radius: 8rpx;
    border: 1px solid #37B3FF;
    color:#37B3FF;
    /*color:#fff;*/
    /*background: #37B3FF;*/
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .warn{
    background: rgb(255,253,253);
    /*border-bottom: 1px solid #f00;*/
  }
  .warn .name {
    color: #f00!important;
  }
  .warn .store {
    color: #f00!important;
  }
  .warn .unit {
    color: #f00!important;
  }
  .warn .button {
    border: 1px solid #f00;
    color:#f00;
  }
</style>
