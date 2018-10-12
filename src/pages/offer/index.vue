<template>
  <div class="wrap">
    <div v-for="item in productList" :key="item._id">
      <div class="categoryName" v-if="item.isSepatator">{{item.name}}</div>
      <div class="item" v-else>
        <div class="itemName"> {{item.name}}</div>
        <div class="itemPrice"> <span class="f12">进:</span>{{item.buyingPrice}}</div>
        <div class="itemPrice"> <span class="f12">代:</span>{{item.agencyPrice}}</div>
        <div class="itemPrice"> <span class="f12">售:</span>{{item.sellPrice}}</div>
      </div>
    </div>

    <!--底部 tab 栏-->
    <div class="tab" @click="addCategory">
      <div class="tabItem bdr" @click="generateOffer('agencyPrice')">生成代理价</div>
      <div class="tabItem" @click="generateOffer('sellPrice')">生成销售价</div>
    </div>
    <!--画布-->
    <canvas canvas-id="canvas" class="canvas" :style="{height: canvasHeight + 'px'}"></canvas>
  </div>
</template>

<script>
  // 创建数据库链接
  const db = wx.cloud.database()
  const product = db.collection('product')
  const category = db.collection('category')
  export default {
    data () {
      return {
        canvasHeight: 300,
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
      // 生成报价
      generateOffer (field) {
        const info = wx.getSystemInfoSync()

        let w = info.screenWidth

        let h = -20
        // 获取总高度
        this.productList.forEach(item => {
          h += item.isSepatator ? 120 : 80
        })

        console.log(w, h)

        this.canvasHeight = h
        const ctx = wx.createCanvasContext('canvas')
        ctx.rect(0, 0, w, 50)
        ctx.setFillStyle('#fee')
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(0, 50)
        ctx.lineTo(w, 50)
        ctx.setStrokeStyle('red')
        ctx.stroke()

        ctx.beginPath()
        ctx.setFontSize(20)
        ctx.setTextBaseline('middle')
        ctx.fillText('Hello', 10, 75)

        ctx.beginPath()
        ctx.moveTo(0, 100)
        ctx.lineTo(w, 100)
        ctx.setStrokeStyle('red')
        ctx.stroke()

        ctx.draw()
      }
    },
    onLoad () {
      this.getCategoryList()
    }
  }
</script>
<style scoped>
  .f12{
    font-size: 12px;
    color:#999;
  }
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
    box-sizing: border-box;
  }
  .bdr{
    border-right: 1rpx solid #e5e5e5;
  }
  .itemName {
    width: 350rpx;
  }
  .itemPrice {
    width: 120rpx;
    font-size: 16px;
  }
  .canvas{
    width: 100%;
    height: 500rpx;
    background: #689950;
  }
</style>
