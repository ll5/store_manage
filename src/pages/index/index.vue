<template>
  <div class="wrap">
    我是首页
    <div class="tab" @click="addCategory">
      <div class="tabItem" v-for="item in categoryList" :key="item._id">
        {{item.name}}
      </div>
    </div>

    <!--悬浮按钮-->
    <div class="floatButton" @click="gotoSetting">设置</div>
  </div>
</template>

<script>
  // 创建数据库链接
  const db = wx.cloud.database()
  const category = db.collection('category')
  export default {
    data () {
      return {
        categoryList: []
      }
    },
    methods: {
      // 去设置页面
      gotoSetting () {
        wx.navigateTo({url: '/pages/manage/main'})
      },
      // 获取分类列表
      getCategoryList () {
        category.limit(9999).get().then(res => {
          this.categoryList = res.data
        })
      }
    },
    onLoad () {
      this.getCategoryList()
    }
  }
</script>
<style scoped>
  .wrap {
    width: 100%;
    height: calc(100vh - 100rpx);
    background: red;
  }

  .tab {
    width: 100%;
    height: 100rpx;
    background: green;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
  }
  .tabItem {
    padding: 0 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    flex-shrink: 1;
  }
  .tabItem:not(:last-child){
    border-right: 1px solid #e5e5e5;
  }
  .floatButton {
    position: fixed;
    top: 50rpx;
    right: 20rpx;
    width: 75rpx;
    height: 75rpx;
    border-radius: 50%;
    background: #000;
    border: 1px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #fff;
    opacity: 0.5;
  }
</style>
