/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 22:11:29
 * @FilePath: \VueBackgroundProject\wenhai\src\utils\validate.js
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */

// 验证表单的函数
export function validUsername(str) {
  // 传入的账号在不在下面的数组中
  const valid_map = ['admin', 'editor']
  // 如果有就返回 true
  return valid_map.indexOf(str.trim()) >= 0
}
