<template>
  <div class="wrap">
    产品管理
  </div>
</template>

<script>
  // 创建数据库链接
  // const db = wx.cloud.database()
  // const category = db.collection('category')
  export default {
    data () {
      return {
        productList: []
      }
    },
    methods: {
    },
    onLoad () {
    }
  }
</script>
<style scoped>
  .wrap{
    padding-top: 20rpx;
  }
</style>
