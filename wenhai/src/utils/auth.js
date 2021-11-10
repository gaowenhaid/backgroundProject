/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 10:52:46
 * @FilePath: \VueBackgroundProject\wenhai\src\utils\auth.js
 */
import Cookies from 'js-cookie'
// 这里对 token 的操作 都是基于 本地的 cookies 中的token
const TokenKey = 'vue_admin_template_token'
// 获取 token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置 token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除 token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
