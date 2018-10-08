// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'backend-2023'
})

// 创建数据库链接
const db = cloud.database()
const product = db.collection('product')

// 云函数入口函数
exports.main = async (event, context) => {
  return await product.where({
    categoryId: event.catId
  }).remove()
}
