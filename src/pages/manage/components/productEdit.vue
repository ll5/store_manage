<template>
  <div class="wrap">
    <div class="content">
      <div class="textWrap">
        分类：
        <picker @change="pickerChange" v-model="index" :range="categorys" range-key="name">
          <div class="text">{{categoryName}}</div>
        </picker>
      </div>
      <div class="textWrap">
        名称：<input class="text" v-model="product.name" />
      </div>
      <div class="textWrap">
        排序：<input class="text" v-model="product.order" />
      </div>
      <div class="textWrap">
        库存：<input class="text" v-model="product.store" />
      </div>
      <div class="textWrap">
        单位：<input class="text" v-model="product.unit" />
      </div>
      <div class="textWrap">
        进货价：<input class="text" v-model="product.buyingPrice" />
      </div>
      <div class="textWrap">
        代理价：<input class="text" v-model="product.agencyPrice" />
      </div>
      <div class="textWrap">
        销售价：<input class="text" v-model="product.sellPrice" />
      </div>
      <div class="closeButton" @click="closeDialog">×</div>
      <div class="saveButton" @click="saveProduct" v-if="product._id">保存</div>
      <div class="saveButton" @click="addProduct" v-else >保存</div>
    </div>
  </div>
</template>

<script>
  // 创建数据库链接
  const db = wx.cloud.database()
  const product = db.collection('product')
  export default {
    data () {
      return {
        index: 0,
        categoryName: ''
      }
    },
    props: {
      product: {
        type: Object,
        default: () => {}
      },
      categorys: {
        type: Array,
        default: () => []
      }
    },
    onLoad () {
      // 回显分类名称
      // console.log(this.product)
      if (this.product.categoryId) {
        let currentCategory = this.categorys.find(item => item._id === this.product.categoryId)
        this.categoryName = currentCategory.name
      }
      // 指定默认排序值
      if (!this.product.order) {
        this.product.order = 1
      }
    },
    methods: {
      // 关闭对话框
      closeDialog () {
        this.$emit('close')
      },
      // 选择数据
      pickerChange (event) {
        let idx = +event.mp.detail.value
        this.product.categoryId = this.categorys[idx]._id
        this.product.categoryOrder = this.categorys[idx].order
        this.categoryName = this.categorys[idx].name
      },
      // 保存编辑数据
      saveProduct () {
        product.doc(this.product._id).update({
          data: {
            name: this.product.name,
            order: +this.product.order,
            store: +this.product.store,
            unit: this.product.unit,
            buyingPrice: +this.product.buyingPrice,
            sellPrice: +this.product.sellPrice,
            agencyPrice: +this.product.agencyPrice,
            categoryId: this.product.categoryId,
            categoryOrder: +this.product.categoryOrder,
            categoryName: this.product.categoryName
          }
        }).then(() => {
          // console.log(this.product)
          wx.showToast({title: '修改成功！'})
          this.$emit('close', true)
        })
      },
      // 新增产品
      addProduct () {
        // console.log(this.product)
        product.add({
          data: {
            name: this.product.name,
            order: +this.product.order,
            store: +this.product.store,
            unit: this.product.unit,
            buyingPrice: +this.product.buyingPrice,
            sellPrice: +this.product.sellPrice,
            agencyPrice: +this.product.agencyPrice,
            categoryId: this.product.categoryId,
            categoryOrder: +this.product.categoryOrder,
            categoryName: this.product.categoryName
          }
        }).then(() => {
          // console.log('success')
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
    align-items: flex-start;
  }
  .content{
    width: 710rpx;
    padding: 40rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
    background: #fff;
    position: relative;
    margin-top: 5vh;
  }
  .text {
    width: 450rpx;
    height: 80rpx;
    /*border: 1px solid #37B3FF;*/
    border: 1px solid #e5e5e5;
    padding: 10rpx;
    box-sizing: border-box;
  }
  .textWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20rpx 0;
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
