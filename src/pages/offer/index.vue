<template>
  <div class="wrap">
    <div v-for="item in productList" :key="item._id">
      <div class="categoryName" v-if="item.isSepatator">{{item.name}}</div>
      <div class="item" v-else>
        <div class="itemName"> {{item.name}}</div>
        <div class="itemPrice"><span class="f12">进:</span>{{item.buyingPrice}}</div>
        <div class="itemPrice"><span class="f12">代:</span>{{item.agencyPrice}}</div>
        <div class="itemPrice"><span class="f12">售:</span>{{item.sellPrice}}</div>
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
              res.data.splice(i, 0, { isSepatator: 1, name: this.getCategoryNameById(res.data[i].categoryId) })
            }
          }
          this.canvasHeight = res.data.length * 50
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
        const ctx = wx.createCanvasContext('canvas')

        // 获取总高度
        this.productList.forEach((item, index) => {
          if (item.isSepatator) {
            ctx.beginPath()
            ctx.rect(0, index * 50, w, 50)
            ctx.setFillStyle('#37B3FF')
            ctx.fill()

            ctx.beginPath()
            ctx.setFontSize(20)
            ctx.setTextBaseline('middle')
            ctx.setFillStyle('#fff')
            ctx.fillText(item.name, 10, index * 50 + 25)
            ctx.fillText(field === 'agencyPrice' ? '代理价' : '价格', w * 0.7, index * 50 + 25)
          } else {
            ctx.beginPath()
            ctx.rect(0, index * 50, w, 50)
            ctx.setFillStyle('#fff')
            ctx.fill()

            ctx.beginPath()
            ctx.setFontSize(20)
            ctx.setFillStyle('#333')
            ctx.setTextBaseline('middle')
            ctx.fillText(item.name, 10, index * 50 + 25)
            ctx.fillText(`${item[field]}/${item.unit}`, w * 0.7, index * 50 + 25)

            ctx.beginPath()
            ctx.moveTo(0, index * 50 + 50)
            ctx.lineTo(w, index * 50 + 50)
            ctx.setStrokeStyle('#f5f5f5')
            ctx.stroke()
          }
        })

        ctx.draw(false, function () {
          wx.canvasToTempFilePath({
            canvasId: 'canvas',
            success (res) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success () {
                  wx.showToast({
                    title: '已保存到系统相册!',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            }
          })
        })
      }
    },
    onLoad () {
      this.getCategoryList()
    }
  }
</script>
<style scoped>
  .f12 {
    font-size: 12px;
    color: #999;
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
    border-top: 1px solid #e5e5e5;
  }

  .categoryName {
    padding: 0 20rpx;
    line-height: 100rpx;
    border-bottom: 1px solid #37B3FF;
    background: #fff;
    margin-top: 20rpx;
  }

  .item {
    padding: 0 20rpx;
    line-height: 80rpx;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
  }

  .bdr {
    border-right: 1rpx solid #e5e5e5;
  }

  .itemName {
    width: 350rpx;
  }

  .itemPrice {
    width: 120rpx;
    font-size: 16px;
  }

  .canvas {
    width: 100%;
    height: 500rpx;
    background: #fff;
    position: fixed;
    left: 110vw;
    top: 0;
  }
</style>
