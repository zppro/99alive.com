/**
 * Created by zppro on 17-7-31.
 */
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 20000
})

export const endpoint = {
  api
}

export default ({ app, store, isServer, isClient }) => {
  // app.router is router instance
  // axios.defaults.baseURL = process.env.API_URL
  // console.log('app:', isServer, isClient, process.browser, process.server)

  api.interceptors.response.use(res => {
    if (res.config) {
      const url = res.config.url.toLowerCase()
      if (res.headers.parse !== 'no-parse') {
        if (!res.data.success) {
          let error = new Error(`业务请求失败:${res.data.msg}`)
          console.error(error)
          return Promise.reject(error)
        } else {
          return res.data.ret || res.data.rows
        }
      } else {
        console.log('---no parse---', url)
      }
    }
    return res
  }, error => {
    console.error(error)
    if (error.response.status >= 500) {
      // 服务器内部错误
    } else if (error.response.status === 401) {
      // 没有认证,跳转到login
    }
    return Promise.reject(error)
  })

  app.api = api
  return api
}