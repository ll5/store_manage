<template>
  <div class="wrap">
   我是首页
    <div class="tab">我是 tab 内容</div>
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
