/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-15 09:28:31
 * @FilePath: \wenhai\src\main.js
 */
import Vue from 'vue'
// 引入样式重置表
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 引入 element-ui库
import ElementUI from 'element-ui'
// 引入 element-ui 的样式表
import 'element-ui/lib/theme-chalk/index.css'

// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 引入全局样式
import '@/styles/index.scss' // global css

// 引入 app 组件
import App from './App'
// 引入 vuex
import store from './store'
// 引入 vue-router
import router from './router'

// 引入图标
import '@/icons' // icon
// 引入
import '@/permission' // permission control

// 引入 api 所有的接口的函数
import * as API from '@/api'

// 将其挂载到 Vue 的原型上
Vue.prototype.$API = API

// 全局注册按钮组件
import HinButton from '@/components/HintButton'


Vue.component(HinButton.name, HinButton)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
// console.log(API)
new Vue({
  el: '#app', router,
  store,
  render: h => h(App)
})
