<template>
  <div class="wrap">
     <div class="content">
       <input class="text" v-model="data.name" auto-focus />
       <div class="closeButton" @click="closeDialog">✖</div>
       <div class="saveButton" @click="saveCategory" v-if="data._id">保存</div>
       <div class="saveButton" @click="addCategory" v-else >保存</div>
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
        name: ''
      }
    },
    props: {
      data: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      setName (name) {
        this.name = name
      },
      // 关闭对话框
      closeDialog () {
        this.$emit('close')
      },
      // 保存编辑数据
      saveCategory () {
        category.doc(this.data._id).update({
          data: {
            name: this.data.name
          }
        }).then(() => {
          wx.showToast({title: '修改成功！'})
          this.$emit('close', true)
        })
      },
      // 新增分类
      addCategory () {
        // let that = this
        category.add({
          data: {
            name: this.data.name
          }
        }).then(() => {
          wx.showToast({title: '新增成功！'})
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
    width: 630rpx;
    height: 100rpx;
    margin: 40rpx 0;
    /*border: 1px solid #37B3FF;*/
    border: 1px solid #e5e5e5;
    padding: 20rpx;
    box-sizing: border-box;
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
