let serverPath = 'https://bgbackend.torvoz.cn/'

let post = function (url, body = {}) {
  return new Promise(async resolve => {
    try {
      body.openId = wx.getStorageSync('openId') || ''
      wx.request({
        url: serverPath + url,
        data: body,
        method: 'POST',
        // header: { 'content-type': 'application/json' },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success (res) {
          resolve(res.data)
        },
        fail (e) {
          resolve(e) // 注意,这里要用resolve,否则前端代码会崩溃
        }
      })
    } catch (e) {
      resolve(e) // 注意,这里要用resolve,否则前端代码会崩溃
    }
  })
}

export default { post }
