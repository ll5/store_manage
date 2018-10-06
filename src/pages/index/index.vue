<template>
  <div class="wrap">
    我是首页
    <div class="tab" @click="addCategory">
      <div class="tabItem" v-for="item in categoryList" :key="item._id">
        {{item.name}}
      </div>
    </div>
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
      getCategoryList () {
        category.get().then(res => {
          this.categoryList = res.data
        })
      },
      addCategory () {
        category.add({
          data: {
            name: '其他',
            enName: 'other'
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
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
</style>
