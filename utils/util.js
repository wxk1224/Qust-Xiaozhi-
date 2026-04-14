const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function getNowWeek(startDate, totalWeek) {
  const nowDate = new Date().getTime()
  startDate = new Date(startDate)
  const time = nowDate - startDate
  let nowWeek = Math.ceil(time / 1000 / 60 / 60 / 24 / 7) //向上取整省略小数
  if(nowWeek > totalWeek){
    nowWeek = 1
  }
  return nowWeek
}

module.exports = {
  formatTime,
  getNowWeek
}
