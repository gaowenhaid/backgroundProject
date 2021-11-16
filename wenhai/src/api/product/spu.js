/*
 * @Date: 2021-11-10 16:44:50
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-16 16:13:35
 * @FilePath: \wenhai\src\api\product\spu.js
 */
// 引入 二次封装的 axios
import request from '@/utils/request'
// 共同的 api名字
const api_name = '/admin/product'

// 所有与 spu 相关的接口函数
export default {
  // GET /admin/product/baseSaleAttrList
  // getBaseSaleAttrList
  // 获取所有的销售属性
  getBaseSaleAttrList() {
    return request.get(`${api_name}/baseSaleAttrList`)
  },

  // DELETE /admin/product/deleteSpu/{spuId}
  // deleteSpu
  // 根据 id 删除一个属性
  deleteSpu(spuId) {
    return request.delete(`${api_name}/deleteSpu/${spuId}`)
  },

  // GET /admin/product/findSpuInfoByKeyword/{keyword}
  // findSpuInfoByKeyword
  // 根据关键字获取spu数据
  getSpuBuKeyWord(keyword) {
    request.get(`${api_name}/findSpuInfoByKeyword/${keyword}`)
  },

  // GET /admin/product/getSpuById/{spuId}
  // 获取spu基本信息,,根据 id
  getSpuById(spuId) {
    return request.get(`${api_name}/getSpuById/${spuId}`)
  },

  // POST /admin/product/inner/findSpuInfoBySpuIdList
  // findSpuInfoBySpuIdList
  // 根据id 的数组获取 spu
  getSpuByArray(spuArrList) {
    request.post(`${api_name}/inner/findSpuInfoBySpuIdList`, spuArrList)
  },

  // POST /admin/product/saveSpuInfo
  // saveSpuInfo
  // POST /admin/product/updateSpuInfo
  // 更改spu信息
  // 添加或修改一个属性(根据 id 来判断是 添加还是修改 有 id就是修改,没有 id 就是添加)
  addOrUpdateSpu(spuInfo) {
    return request.post(`${api_name}/${spuInfo.id ? 'updateSpuInfo' : 'saveSpuInfo'}`, spuInfo)
  },

  // GET /admin/product/{page}/{limit}
  // 根据分页器来过去数据
  getSpuByPage(page, limit, category3Id) {
    return request.get(`${api_name}/${page}/${limit}`, { params: { category3Id } })
  }
}