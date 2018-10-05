// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('===', event)
  return {
    name: 'noah',
    age: 18,
    id: 12312312312
  }
}