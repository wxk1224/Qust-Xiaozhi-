// 存放请求接口

import createRequest from '../utils/request'

export function loginRequest(data){
  return createRequest({
    url:'/login', //从接口路由获取
    method: 'POST',
    data,
    needLogin: false
  })
}

export function getScoreRequest(data){
  return createRequest({
    url:'/scores', 
    data,
  })
}

export function getRawScoreRequest(data){
  return createRequest({
    url:'/raw-scores', 
    data,
  })
}

export function getCourseListRequest(data) {
  return createRequest({
    url: '/courses',
    data
  })
}
