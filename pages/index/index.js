// index.js
const app = getApp()
import{
  getNowWeek
}from '../../utils/util'


Page({
  data: {
    navList:[
      {
        title:'查课表',
        icon: '/asset/icon/课表.png',
        path: '/pages/course/course'
      },
      {
        title:'查成绩',
        icon: '/asset/icon/成绩.png',
        path: '/pages/score/score'
      },
      {
        title:'查考试',
        icon: '/asset/icon/考试.png',
        path: '/pages/exam/exam'
      },
      {
        title:'查校历',
        icon: '/asset/icon/校历.png',
        path: '/pages/calender/calender'
    }],
    startDate: '2023/02/20',
    totalWeek: 20,
    baseUrl: app.getConfig("baseUrl")
  },

  onLoad() {
   this.getTodayCourseList()
  },
  nav(e) {
    const index = e.currentTarget.dataset.index
    const path = this.data.navList[index].path
    wx.navigateTo({
      url: path,
      // 跳转失败 方法处理跳转
      fail(){
        wx.switchTab({
          url: path,
        })
      }
    })
  },

  getTodayCourseList(){
    const courseList = wx.getStorageSync('courses')
    if(!courseList) return

    // const todayWeek = new Date().getDay() //从周日开始算的
    // const todayWeeks = getNowWeek(this.data.startDate, this.data.totalWeek)
    const todayWeek = 3
    const todayWeeks = 1

    const todayCourseList = courseList.filter(item =>{
      return item.week == todayWeek && item.weeks.indexOf(todayWeeks) > -1
    }) 
    console.log(todayCourseList)
    todayCourseList.sort((a,b)=>{
      return a.section - b.section
    })
    
 
    this.setData({
      todayWeek,
      todayWeeks,
      todayCourseList
    })
   
   
  }

})