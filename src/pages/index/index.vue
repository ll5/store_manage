<template>
  <div class="wrap">
    <div v-for="item in productList" :key="item._id">
      <productItem :product="item" />
    </div>
    <!--底部 tab 栏-->
    <div class="tab" @click="addCategory">
      <div class="tabItem"
           :class="{tabItemActivity: currentCategoryId === item._id}"
           v-for="item in categoryList"
           :key="item._id"
           @click="switchTab(item._id)">
        {{item.name}}
      </div>
    </div>

    <!--悬浮按钮-->
    <div class="floatButton" @click="gotoSetting">设置</div>
  </div>
</template>

<script>
  import productItem from './components/productItem'
  // 创建数据库链接
  const db = wx.cloud.database()
  const category = db.collection('category')
  const product = db.collection('product')
  export default {
    components: {productItem},
    data () {
      return {
        currentCategoryId: '',
        categoryList: [],
        productList: []
      }
    },
    methods: {
      // 去设置页面
      gotoSetting () {
        wx.navigateTo({url: '/pages/manage/main'})
      },
      switchTab (id) {
        if (this.currentCategoryId === id) return
        this.productList = []
        this.currentCategoryId = id
        this.getProductList()
      },
      // 获取分类列表
      getCategoryList () {
        category.limit(9999).get().then(res => {
          this.categoryList = res.data
          this.currentCategoryId = res.data[0]._id
          this.getProductList()
        })
      },
      // 获取产品列表
      getProductList () {
        product.limit(9999).where({categoryId: this.currentCategoryId}).get().then(res => {
          this.productList = res.data
        })
      },
      // 获取库存预警的商品数量
      getStoreWarnNum () {
        const _ = db.command
        product.where({store: _.lt(_.storeWarn)}).count().then(res => {
          console.log('库存预警', res)
        })
      }
    },
    onShow () {
      this.getCategoryList()
      this.getStoreWarnNum()
    }
  }
</script>
<style scoped>
  .wrap {
    width: 100%;
    height: calc(100vh - 100rpx);
    background: #f5f5f5;
    overflow-y: scroll;
  }

  .tab {
    width: 100%;
    height: 100rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    border-top: 1px solid #e5e5e5
  }
  .tabItem {
    padding: 0 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
    font-size: 14px;
  }
  .tabItem:not(:last-child){
    border-right: 1px solid #e5e5e5;
  }
  .tabItemActivity {
    color: #37B3FF;
  }
  .floatButton {
    position: fixed;
    bottom: 10vh;
    right: 5vw;
    width: 75rpx;
    height: 75rpx;
    background: #000;
    border-radius: 50%;
    border: 1px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #fff;
    opacity: 0.5;
  }
</style>
