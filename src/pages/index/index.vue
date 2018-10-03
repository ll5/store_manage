<template>
  <div class="wrap">
   我是首页
    <div class="tab" @click="test">我是 tab 内容</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {},
    methods: {
      test () {
        wx.cloud.callFunction({
          name: 'login',
          success: res => {
            console.log('云函数调用结果', res)
          }
        })
      }
    },
    onLoad () {
    }
  }
</script>
<style scoped>
  .wrap {
    width: 100%;
    height: calc(100vh - 100rpx);
    background: red;
  }
  .tab{
    width: 100%;
    height: 100rpx;
    background: green;
    position: fixed;
    left: 0;
    bottom:0;
  }
</style>
