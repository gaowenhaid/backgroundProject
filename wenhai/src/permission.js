/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 14:49:34
 * @FilePath: \VueBackgroundProject\wenhai\src\permission.js
 */
// 引入 router
import router from './router'
// 引入 store 仓库
import store from './store'
// 引入 element-ui
import { Message } from 'element-ui'
// 引入进度条
import NProgress from 'nprogress' // progress bar
// 引入进度条的样式
import 'nprogress/nprogress.css' // progress bar style
// 引入 获取token 的函数
import { getToken } from '@/utils/auth' // get token from cookie
// 获取拼接页面标题的函数  该函数是需要传入路由对应的标题名字的
import getPageTitle from '@/utils/get-page-title'

// 设置进度条中的 进度环的显示与隐藏
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单列表数据  -- 数组  该名单 中只有 /login 的路由地址
const whiteList = ['/login'] // no redirect whitelist

// 全局前置路由守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar
  // 开始进度条
  NProgress.start()

  // set page title
  // 将页面的标题设置为 那个拼接标题的函数,传递的参数为to.meta中的title属性
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // 获取 token 数据(从 cookie 中)
  const hasToken = getToken()

  // 如果有 token
  if (hasToken) {
    // 如果有 token 去的且是 login 页面
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // 那么就让他去首页,因为 有 token 就证明他登录过了,所以让他去 / 首页就行
      next({ path: '/' })
      // 进度条结束
      NProgress.done()
    } else {
      // 如果去的不是 login 页面, 获取一下用户名
      const hasGetUserInfo = store.getters.name
      // 判读 当前登录了 你有没有用户信息
      if (hasGetUserInfo) {
        // 如果即登录了,也有用户的信息,那么就想去哪就去哪
        next()
      } else {
        // 如果没有用户信息的话，但是有 token 那就拿着 token 去 获取一下 用户信息
        //  这里使用了命名空间  派发一个 action 为 获取用户信息
        try {
          // get user info
          await store.dispatch('user/getInfo')
          // 然后想去哪就去哪
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          // 这里就是获取用户信息失败，也就是一位置 当前的 token 是无效的，例如 token 过去。。等等
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // 那么就让他跳到登录页面，进行重新登录，并保存一个 query 参数到 路径中，方便后期进行重定向
          next(`/login?redirect=${to.path}`)
          // 关闭进度条
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // 如果没 token 的话 那么就判断他是否是要去 登录页面
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      // 如果是 就放行
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 如果不是的话，就同样保存一个 query 参数到 路径中，然后跳转到 login 页面上，方便一会重定向
      next(`/login?redirect=${to.path}`)
      // 关闭进度条
      NProgress.done()
    }
  }
})

// 全局路由后置守卫
router.afterEach(() => {
  // finish progress bar
  // 关闭进度条
  NProgress.done()
})
