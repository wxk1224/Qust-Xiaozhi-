import{
  getScoreRequest,
  getRawScoreRequest
}from '../../api/main'
const scoreCacheKey = "scores"
const rawScoreCacheKey = "rawScores"

Page({

  data: {
    type: 1, // 1 有效成绩； 2原始成绩
    list:[],
    termIndex:0, // 当前学期索引
  },
  onLoad(options) {
    this.getScore()
  },

  // 成绩信息从缓存中读取，如果没有再更新
  getScore(){
    const cache = wx.getStorageSync(this.data.type == 1 ? scoreCacheKey : rawScoreCacheKey)
    if(cache){
      this.setData({
        list: cache
      })
      return
    }
    this.update()
  },

  // 更新按钮逻辑
  update(){
    const that = this
    let p = null;
    if(that.data.type == 1){
      p = getScoreRequest()
    }else{
      p = getRawScoreRequest()
    }
    p.then(res =>{
      that.setData({
        list: res.data
      })
      wx.setStorageSync(that.data.type == 1 ? scoreCacheKey : rawScoreCacheKey,res.data)
    })
  },

  // 切换成绩按钮
  changeScoreType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      type
    })
    this.getScore()
  },
  
  // selector 功能
  changeTerm(e) {
    const termIndex = e.detail.value
    this.setData({
      termIndex
    })
  }

})