/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 15:01:44
 * @FilePath: \VueBackgroundProject\wenhai\src\store\modules\user.js
 */
// 获取用户信息的回调函数和 登录 退出 和 获取用户信息
import { login, logout, getInfo } from '@/api/user'

// 获取 token 设置 token  和删除 token 的三个回调
import { getToken, setToken, removeToken } from '@/utils/auth'
// 
import { resetRouter } from '@/router'


const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login     用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
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
          return reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
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
        resetRouter()
        commit('RESET_STATE')
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
      commit('RESET_STATE')
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

