import request from '@/utils/request'

export function login (data) {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: new URLSearchParams(data).toString()
  })
}
// 获取用户信息
export function getUserInfo () {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
