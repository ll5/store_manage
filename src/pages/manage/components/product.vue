<template>
  <div class="wrap">
    <div v-for="item in productList" :key="item._id">
      <div class="categoryName" v-if="item.isSepatator">{{item.name}}</div>
      <div class="item" v-else>
        <div class="itemName"> {{item.name}}</div>
        <div class="itemStore"> {{item.store}} <span class="f14">{{item.unit}}</span></div>
        <div class="buttonWrap">
          <image class="icon" src="/images/edit.svg" @click="openEditProduct(item)"></image>
          <image class="icon" src="/images/store.svg" @click="openStoreAdd(item)"></image>
        </div>
      </div>
    </div>
    <!--新增按钮-->
    <div class="addButton" @click="openEditProduct">新增</div>
    <!--报价按钮-->
    <!--<div class="offerButton" @click="wx.redirectTo({url: ''})">查看报价</div>-->
    <navigator url="/pages/offer/main" class="offerButton" hover-class="navigator-hover">查看报价</navigator>
    <!--新增弹窗-->
    <productEdit v-if="showDialog" :product="currentProduct" :categorys="categoryList" @close="closeEditProduct" />
    <!--进货弹窗-->
    <storeAdd v-if="showStoreAddDialog" :product="currentProduct" @close="closeStoreAdd" />
  </div>
</template>

<script>
  import productEdit from './productEdit'
  import storeAdd from './storeAdd'
  // 创建数据库链接
  const db = wx.cloud.database()
  const product = db.collection('product')
  const category = db.collection('category')
  export default {
    components: {productEdit, storeAdd},
    data () {
      return {
        showDialog: false, // 是否显示新增 / 编辑 对话框
        showStoreAddDialog: false, // 是否显示 进货 对话框
        currentProduct: null, // 当前选中的分类
        categoryList: [], // 产品分类列表
        productList: []
      }
    },
    methods: {
      // 获取产品列表
      getProductList () {
        product.orderBy('categoryOrder', 'desc').orderBy('order', 'desc').limit(9999).get().then(res => {
          for (let i = res.data.length - 1; i >= 0; i--) {
            if (!res.data[i - 1] || res.data[i - 1].categoryId !== res.data[i].categoryId) {
              res.data.splice(i, 0, {isSepatator: 1, name: this.getCategoryNameById(res.data[i].categoryId)})
            }
          }
          this.productList = res.data
        })
      },
      getCategoryNameById (id) {
        let cat = this.categoryList.find(i => i._id === id)
        return cat.name
      },
      // 获取分类列表
      getCategoryList () {
        category.orderBy('order', 'desc').limit(9999).get().then(res => {
          this.categoryList = res.data
          this.getProductList()
        })
      },
      // 关闭 编辑 对话框
      closeEditProduct (isRefresh) {
        this.showDialog = false
        this.currentProduct = null
        isRefresh && this.getProductList()
      },
      // 打开 编辑 对话框
      openEditProduct (product = {}) {
        this.currentProduct = product
        this.showDialog = true
      },
      // 关闭 编辑 对话框
      closeStoreAdd (isRefresh) {
        this.showStoreAddDialog = false
        this.currentProduct = null
        isRefresh && this.getProductList()
      },
      // 打开 编辑 对话框
      openStoreAdd (product = {}) {
        this.currentProduct = product
        this.showStoreAddDialog = true
      },
      // 删除分类
      deleteProduct (id) {
        let that = this
        wx.showModal({
          title: '确定要删除这个产品吗？',
          content: '删除产品，会导致该产品的库存全部清空！',
          success (res) {
            if (res.confirm) {
              product.doc(id).remove().then(res => {
                wx.showToast({title: '删除成功'})
                that.getProductList()
              })
            }
          }
        })
      }
    },
    onLoad () {
      this.getCategoryList()
    }
  }
</script>
<style scoped>
  .f14{
    font-size: 14px;
    color:#999;
  }
  .blue {
    color: #37B3FF
  }
  .red{
    color: #f43d41;
  }
  .grey{
    color: #999;
    font-size: 12px;
  }
  .wrap{
  }
  .categoryName{
    padding: 0 20rpx;
    line-height: 100rpx;
    border-bottom: 1px solid #37B3FF;
    background: #fff;
    margin-top: 20rpx;
  }
  .item{
    padding: 0 20rpx;
    line-height: 80rpx;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
  }
  .itemName {
    width: 480rpx;
  }
  .itemStore {
    width: 150rpx;
  }
  .buttonWrap {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    width: 80rpx;
  }
  .icon{
    width: 30rpx;
    height: 30rpx;
  }
  .addButton {
    position: fixed;
    bottom: 10vh;
    right: 5vw;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background: #37B3FF;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
  .offerButton {
    width: 710rpx;
    height: 80rpx;
    border-radius: 8rpx;
    background: #f43d41;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    margin: 50rpx 20rpx 0 20rpx;
  }
</style>
