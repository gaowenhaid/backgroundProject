/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 21:55:22
 * @FilePath: \VueBackgroundProject\wenhai\src\router\index.js
 */
// 引入 vue
import Vue from 'vue'
// 引入 vue-router
import Router from 'vue-router'
// 使用 vue-touter
Vue.use(Router)
// 引入外部配置好的路由
import {constantRoutes} from './routers'

// 创建路由器对象的函数--路由器初始化操作
const createRouter = () => new Router({
  // mode: 'history', // require service support
  // 滚动轴的设置
  scrollBehavior: () => ({ y: 0 }),
  // 路由的配置
  routes: constantRoutes
})
// 实例化路由对象
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由函数
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// 暴露路由对象
export default router
