/*
 * @Date: 2021-11-09 16:58:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 10:37:10
 * @FilePath: \VueBackgroundProject\wenhai\src\store\getters.js
 */
const getters = {
  // 
  sidebar: state => state.app.sidebar,

  device: state => state.app.device,
  // 获取 token
  token: state => state.user.token,
  // 获取用户头像
  avatar: state => state.user.avatar,
  // 获取用户名
  name: state => state.user.name
}
// 暴露
export default getters
