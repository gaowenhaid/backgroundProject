/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 10:49:17
 * @FilePath: \VueBackgroundProject\wenhai\src\api\user.js
 */
// 二次封装的 axios 
import request from '@/utils/request'

// 获取用户登录的接口函数
export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    // 接口
    url:'/admin/acl/index/login',
    method: 'post',
    // 携带请求体
    data
  })
}

// 获取用户信息的接口函数
export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/user/info',
    // 获取用户信息的接口
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

// 获取用户退出登录的接口函数
export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
  //退出登录的接口
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
