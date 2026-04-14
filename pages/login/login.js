import{
  loginRequest
}from "../../api/main"

const app = getApp()
Page({
  data: {
    stuId: '',
    password: '',
    baseUrl: app.getConfig("baseUrl")
  },

  onLaunch: function() {

  
  },


  onLoad(options) {

  },
  
  fakeCallback(){
    // 用于解决 双向绑定报错
  },

  login(){
    const that = this
    const postData = {
      stuId: that.data.stuId,
      password: that.data.password
    }
    wx.showLoading({
      title: '登陆中',
    })
    // 调用引入的方法
    loginRequest(postData).then(res => {
      wx.hideLoading()
      if(res.code == -1){
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        return
      }
      wx.setStorageSync('token', res.data.cookie)
      wx.showToast({
        title: '登陆成功',
        icon: 'success'
      })
      setTimeout(() => {
          wx.redirectTo({
            url: '/pages/index/index',
            fail(){
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
      },1500);
    })
  }
})
