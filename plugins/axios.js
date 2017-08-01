/**
 * Created by zppro on 17-7-31.
 */
import axios from 'axios'


export default ({ store , isDev}) => {
  // app.router is router instance
  let host = isDev ? 'http://192.168.10.194:3003' : 'http://localhost:3003'
  axios.defaults.baseURL = `${host}/apis`

  axios.interceptors.response.use(res => {
    // console.log('interceptors response:', res)

    if (process.BROWSER_BUILD) {
      return res
    } else {
      let url = res.config.url.toLowerCase()
      if (url.indexOf(axios.defaults.baseURL) === 0) {
        if (res.headers.parse !== 'no-parse') {
          console.log('---parse---', url)
          if (!res.data.success) {
            let error = new Error(`请求失败:${res.data.msg}`)
            console.error(error)
            return Promise.reject(error)
          }
        }
      }
      return res
    }
  }, error => {
    console.error(error)
    return Promise.reject(error)
  })
}