/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-12 09:31:14
 * @FilePath: \wenhai\src\utils\request.js
 */
// 引入 axios
import axios from 'axios'
// element-ui 的按需引入
import { MessageBox, Message } from 'element-ui'
// 引入 仓库
import store from '@/store'
// import { getToken } from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
  // 设置默认写入地址
  baseURL: process.env.VUE_APP_BASE_API, // 路径开头都加这个路径名 , 就是 process.env 文件里的 VUE_APP_BASE_API 这个变量
  // 超时时间
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 判断当前是否有 token
    const token = store.getters.token
    // 如果有 则
    if (token) {
      // 将 token 携带给请求头
      config.headers['token'] = token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(

  response => {
    // 返回响应数据
    const res = response.data

    // 错误码判断 一定要记住这里写不等于 200
    if (res.code !== 20000 && res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },

  // 这个是开发的时候需要看的报错提示 在项目上线的时候删除
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
