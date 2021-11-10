/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 14:39:43
 * @FilePath: \VueBackgroundProject\wenhai\src\utils\get-page-title.js
 */
// 引入标题级左侧菜单相关的对象
import defaultSettings from '@/settings'

// 设置默认页面标题
const title = defaultSettings.title || '尚品汇后台项目'

// 暴露出去一个函数(函数需要传递一个参数,参数的值为 页面的标题)
export default function getPageTitle(pageTitle) {
  // 如果有参数,就将其两个拼接
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  // 如果没有的话就返回默认的标题
  return `${title}`
}
