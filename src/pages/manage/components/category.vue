<template>
  <div class="wrap">
    <div class="item" v-for="item in categoryList" :key="item._id">
      {{item.name}}
      <div class="buttonWrap">
        <div class="blue" @click="openEditCategory(item)">编辑</div>
        <div class="red" @click="deleteCategory(item._id)">删除</div>
      </div>
    </div>
    <!--新增按钮-->
    <div class="addButton" @click="openEditCategory">新增</div>
    <!--新增弹窗-->
    <categoryEdit v-if="showDialog" :category="currentCategory" @close="closeEditCategory" />
  </div>
</template>

<script>
  import categoryEdit from './categoryEdit'
  // 创建数据库链接
  const db = wx.cloud.database()
  const category = db.collection('category')
  export default {
    components: {categoryEdit},
    data () {
      return {
        showDialog: false, // 是否显示新增 / 编辑 对话框
        currentCategory: {}, // 当前选中的分类
        categoryList: []
      }
    },
    methods: {
      // 获取分类列表
      getCategoryList () {
        category.orderBy('order', 'desc').limit(9999).get().then(res => {
          this.categoryList = res.data
        })
      },
      // 新增分类
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
      },
      // 关闭 编辑 对话框
      closeEditCategory (isRefresh) {
        this.showDialog = false
        this.currentCategory = {}
        isRefresh && this.getCategoryList()
      },
      // 打开 编辑 对话框
      openEditCategory (category = {}) {
        this.currentCategory = category
        this.showDialog = true
      },
      // 删除分类
      deleteCategory (id) {
        let that = this
        wx.showModal({
          title: '确定要删除这个分类吗？',
          content: '删除分类，会导致该分类下的产品全部没掉。',
          success (res) {
            if (res.confirm) {
              category.doc(id).remove().then(res => {
                wx.showToast({title: '删除成功'})
                that.getCategoryList()
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
  .blue {
    color: #37B3FF
  }
  .red{
    color: #f43d41;
  }
  .wrap{
    padding-top: 20rpx;
  }
  .item{
    padding: 0 20rpx;
    line-height: 100rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .buttonWrap {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    width: 60px;
  }
  .item:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
  .addButton {
    width: 710rpx;
    height: 100rpx;
    border-radius: 8rpx;
    background: #37B3FF;
    color: #fff;
    margin: 50rpx 20rpx 0 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
