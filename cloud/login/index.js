// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'yimeikucun-2023'
})

// 创建数据库链接
const db = wx.cloud.database()
// const manage = db.collection('manage')

// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('category').add({
    data:{
      name: '分类名称',
      enName: 'manage name'
    },
    success (res) {
      return res
    }
  }).then(res => {
    return {
      name: 'noah',
      age: 19
    }
    // return res
  }).catch(err => {
    return {
      name: 'noah',
      age: 18
    }
    // return err
  })

}
