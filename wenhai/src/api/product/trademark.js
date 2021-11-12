/*
 * @Date: 2021-11-10 16:44:50
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-12 09:29:59
 * @FilePath: \wenhai\src\api\product\trademark.js
 */
// 引入二次封装的 axios
import request from '@/utils/request'

// 定义一个常量,来保存 所有接口 共同相似的 url
const api_name = '/admin/product/baseTrademark'

// 所有与 trademark 相关的接口函数
export default {
  // 根据 关键字 来获取数据列表
  // GET /admin/product/baseTrademark/findBaseTrademarkByKeyword/{keyword}
  // findBaseTrademarkByKeyword
  findBaseTrademarkByKeyword(keyword) {
    // 第一种写法
    return request({
      // 这里直接拼接变量就行 这个请求方法需要传递一个关键字为 参数
      url: `${api_name}/findBaseTrademarkByKeyword/${keyword}`,
      method: 'GET'
    })
    // 第二种写法
    // return request.get(`${api_name}/findBaseTrademarkByKeyword/${keyword}`)
  },

  // 根据产品 id 来获取数据
  // GET /admin/product/baseTrademark/get/{id}
  // 获取BaseTrademark
  getTrademarkById(id) {
    // 第一种写法
    request({
      url: `${api_name}/get/${id}`,
      method: 'GET'
    })
    // 第二种写法
    // return request.get(`${api_name}/get/${id}`)
  },

  // #region
  // 根据传递进来的数组,来进行数据的查找(但是这个接口我们不用)
  // POST /admin/product/baseTrademark/inner/findBaseTrademarkByTrademarkIdList
  // findBaseTrademarkByTrademarkIdList
  // findBaseTrademarkByTrademarkIdList(TrademarkIdList){
  //     return request({
  //         url:`${api_name}/inner/findBaseTrademarkByTrademarkIdList`,
  //         method: 'post',
  //         data:TrademarkIdList
  //     })
  // }
  // #endregion

  // 根据 id 删除一条数据
  // DELETE /admin/product/baseTrademark/remove/{id}
  // 删除BaseTrademark
  deleteTrademark(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'DELETE'
    })
  },
  // 增加一个数据,增加的数据需要有 id 图片路径 名字,所以我们外部需要传递进来一个对象
  // POST /admin/product/baseTrademark/save
  // 新增BaseTrademark
  // addTrademark(trademark){
  //     return request({
  //         url:`${api_name}/save`,
  //         method: 'POST',
  //         data:trademark,
  //     })
  //     // 第二种写法
  //     // return request.post(`${api_name}/save`,trademark)
  // },
  // #endregion

  // // 根据 id 名字 和 图片路径 来 修改一条数据,这里也需要传进来一个对象
  // // PUT /admin/product/baseTrademark/update
  // // 修改BaseTrademark
  // updateTrademark(trademark){
  //     return request({
  //         url:`${api_name}/update`,
  //         method: 'put',
  //         data:trademark,
  //     })
  // },
  // #endregion
  // 增加数据的请求 和 修改的方法也一样,区别就是 路径 和 请求方法的区别,我们也可以将其封装
  addOrUpdateTrademark(trademark) {
    // 更新数据是需要将 id 携带过去的,而创建则不需要传递 id 所以我们可以根据 id 进行判断他是 增加还是修改
    if (trademark.id) { // 如果有 id 的话,就是修改,就让他发送修改的请求
      return request.put(`${api_name}/update`, trademark)
    } else {
      // 如果没有的话就让他发送增加的接口函数
      return request.post(`${api_name}/save`, trademark)
    }
  },
  // #region
  // 获取数据列表,根据 分页和单页有多少条数据来确定
  // GET /admin/product/baseTrademark/{page}/{limit}
  // 分页列表
  // getTrademarkListByPage(page,limit){
  //     return request({
  //         url:`${api_name}/${page}/${limit}`,
  //         method:'GET'
  //     })
  // }
  // #endregion

  // region
  // 获取所有的数据列表信息
  // GET /admin/product/baseTrademark/getTrademarkList
  // getTrademarkList
  // getTrademarkList() {
  //     return request({
  //         url: `${api_name}/getTrademarkList`,
  //         method: 'GET'
  //     })
  //     // 第二种写法
  //     // return request.get(`${api_name}/getTrademarkList`)
  // },
  // #endregion

  // 因为请求全部数据接口和分页接口一样,只是一个带参一个不带的区别,所以我们可以将这两个方法合并
  getTrademarkList(page, limit) {
    // 如果外部传递了 页码数和单页数据的话,我们就 发获取分页器数据的请求
    if (page && limit) {
      return request.get(`${api_name}/${page}/${limit}`)
    } else {
      // 如果没有传递的话,我们就 发送获取全部数据的请求
      return request.get(`${api_name}/getTrademarkList`)
    }
  }
}
