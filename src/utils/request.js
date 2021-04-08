import Axios from 'axios'
import Store from '@/store'
import Router from '@/router'

const request = Axios.create({
  baseURL: 'http://edufront.lagou.com'
})
// 跳转login
function toLogin () {
  Router.push({
    name: 'login',
    query: {
      redirect: Router.currentRoute.fullPath
    }
  })
}

// 请求拦截器  设置token
request.interceptors.request.use((config) => {
  // console.log(config)
  if (Store.state.user && Store.state.user.access_token) {
    config.headers.Authorization = Store.state.user.access_token
  }
  return config
})

// 存储失败请求
// eslint-disable-next-line prefer-const
let requserErrArr = []
// 控制
let isloadingToken = false
// 设置响应拦截器，处理401，刷新token
request.interceptors.response.use(response => {
  return response
}, async error => {
  // console.log(Router)
  // console.dir(error)
  if (error.request) {
    if (error.request.status === 401) {
      // 没有token信息，跳转login
      if (!Store.state.user) {
        toLogin()
        return Promise.reject(error)
      }
      if (isloadingToken) {
        // 以函数把失败请求存起来
        return requserErrArr.push(() => {
          request(error.config)
        })
      }
      // console.log(requserErrArr, 1)
      isloadingToken = true
      // 发送请求，刷新token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new URLSearchParams({ refreshtoken: Store.state.user.refresh_token }).toString()
      })
      if (!data.success) {
        Store.commit('setUser', null)
        toLogin()
        return Promise.reject(error)
      }
      Store.commit('setUser', data.content)
      console.log(data)
      // 发送失败的请求
      requserErrArr.forEach(item => item())
      requserErrArr = []
      // 更新刷新token状态
      isloadingToken = false
      // 方法本次失败请求
      return request(error.config)
    }
  }
  return Promise.reject(error)
})

export default request
