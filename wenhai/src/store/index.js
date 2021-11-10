/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 22:10:32
 * @FilePath: \VueBackgroundProject\wenhai\src\store\index.js
 */
// 引入 vue
import Vue from 'vue'
// 引入 vuex
import Vuex from 'vuex'
// 引入总的 getters 
import getters from './getters'
// 引入 app 模块
import app from './modules/app'
// 引入 settings
import settings from './modules/settings'
// 引入 user 模块
import user from './modules/user'
// 使用 vuex 插件
Vue.use(Vuex)

// 实例化 store 
const store = new Vuex.Store({
  // 模块化
  modules: {
    app,
    settings,
    user
  },
  getters
})
// 暴露
export default store
