// 由于请求可能会出现很多问题，所以封装成一个js

// 获取整个小程序实例 
const app = getApp()

export default function createRequest(options){
  return new Promise((resolve) =>{
    // cookie失效重新登录跳转
      const token = wx.getStorageSync('token')
      if(options.needLogin !== false && !token){
        wx.showToast({
          title: '您还未登陆',
          icon: 'none'
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        },1500);
        return
      }
    /* 请求拦截开始 */
      // 链接动态生成
      
      // const baseUrl = 'http://localhost:1224'
      const baseUrl = app.getConfig("baseUrl")
      const url = `${baseUrl}${options.url}`
      const header = {
          token
      }
      // 加载提示
      let showLoading = false
      if(options.loading !== false){
        showLoading = true
        wx.showLoading({
          title: '正在加载',
          mask:true
        })
      }
    /* 请求拦截结束 */

    /* 发送请求开始 */
    wx.request({
      url,
      method: options.method || 'GET', // 默认提交方法
      timeout: options.timeout || 20000, // 默认超时时长
      header, // 默认请求头
      data:options.data || {}, // 默认请求数据

      // 以下部分类似于 try-catch-finally
      success(res){
        res = res.data
        console.log(res.code)
        switch(res.code) {
          // 请求成功 直接回调 
          case 0:
            return resolve(res)
          // 请求失败 输出异常信息
          case -1:
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
            break;
          // cookie过期
          case 403:
            wx.showToast({
              title: '登录已失效，请重新登录',
              icon: 'none'
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }, 1000);
            break;
          // 其他异常
          default:
            wx.showToast({
              title: '服务开小差啦！',
              icon: 'none'
            })
            break
        }
      },
      fail(){
        wx.showToast({
          title: '服务开小差啦！',
          icon: 'none'
        })
      },
      complete(){
        // 如果正在加载， 隐藏
        if(showLoading){
          wx.hideLoading()
        }
      }
    })
  /* 发送请求结束 */




  })
}