/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 22:04:20
 * @FilePath: \VueBackgroundProject\wenhai\src\store\modules\user.js
 */
// 获取用户信息的回调函数和 登录 退出 和 获取用户信息
import { login, logout, getInfo } from '@/api/user'

// 获取 token 设置 token  和删除 token 的三个回调
import { getToken, setToken, removeToken } from '@/utils/auth'
// 引入重置路由的回调函数
import { resetRouter } from '@/router'

// 初始化 state 对象的回调函数
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}
// 创建一个 state 对象
const state = getDefaultState()

// 创建一个mutations对象
const mutations = {
  // 重置state对象
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 保存token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 保存用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 保存头像信息
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}
// actions 对象
const actions = {
  // user login     用户登录的 actions
  login({ commit }, userInfo) {
    // 结构出账号和密码
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 调用 login 登录的 api接口函数,并传入 账号和密码
      login({ username: username.trim(), password: password }).then(response => {
        // 结构出所需要的 data 数据
        const { data } = response
        // 提交保存 token 的mutations 方法 将 token 携带过去
        commit('SET_TOKEN', data.token)
        // 调用 setToken 这个方法,将 token 存储给 cookies
        setToken(data.token)
        resolve()
      }).catch(error => {
        // 登录失败
        reject(error)
      })
    })
  },

  // get user info   获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 这里是调用获取 用户信息的 接口函数,这里为啥不用传递 token 呢?
      // 因为 我们的token 已经存储在 请求头中了,所以我们这里就不用携带了
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          // 如果没有用户信息,则提示,重新进行登录
          return reject('请您重新登录')
        }
        // 结构出用户名和头像
        const { name, avatar } = data
        // 保存用户名和头像
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout  用户退出登录 
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 删除token 
        resetRouter() // 重置路由
        commit('RESET_STATE') //重置 state
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 删除token 
      commit('RESET_STATE') //重置 state
      resolve()
    })
  }
}

// 暴露出去
export default {
  // 为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
  // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  // 开启命名空间
  namespaced: true,
  state,
  mutations,
  actions
}

