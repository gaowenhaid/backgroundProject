/*
 * @Date: 2021-11-10 16:44:50
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-16 10:13:51
 * @FilePath: \wenhai\src\api\product\sku.js
 */
// 引入 二次封装的 axios
import request from '@/utils/request'
// 定义同名接口
const api_name = '/admin/product'

// 所有与 sku 相关的接口函数
export default {
  // GET /admin/product/cancelSale/{skuId}
  // cancelSale
  // 根据id下架商品
  cancelSale(skuId) {
    return request.get(`${api_name}/cancelSale/${skuId}`)
  },

  // GET /admin/product/onSale/{skuId}
  // onSale
  // 根据id 上架
  onSale(skuId) {
    return request.get(`${api_name}/onSale/${skuId}`)
  },
  // 根据 id 删除一个 sku
  // DELETE /admin/product/deleteSku/{skuId}
  // deleteSku
  deleteSku(skuId) {
    return request.delete(`${api_name}/deleteSku/${skuId}`)
  },
  // GET /admin/product/findBySpuId/{spuId}
  // findBySpuId
  // 根据 spu的id 获取对应的 skuInfo 的数据
  getSkuInfoListBySpuId(spuId) {
    return request.get(`${api_name}/findBySpuId/${spuId}`)
  },
  // GET /admin/product/getSkuById/{skuId}
  // getById
  // 根据 skuId 来获取数据
  getSkuById(skuId) {
    return request.get(`${api_name}/getSkuById/${skuId}`)
  },
  // GET /admin/product/inner/findSkuInfoByKeyword/{keyword}
  // findSkuInfoByKeyword
  // 根据 关键字来获取数据
  getSkuInfoByKeyword(keyword) {
    return request.get(`${api_name}/getSkuInfoBy/inner/findSkuInfoByKeyword/${keyword}`)
  },
  // POST /admin/product/inner/findSkuInfoBySkuIdList
  // findSkuInfoBySkuIdList
  // 根据对应的 skuId 的列表来获取对应的  skuInfo 对象的列表数据
  getSkuInfoBySkuIdList(skuIdList) {
    return request.post(`${api_name}/inner/findSkuInfoBySkuIdList`, skuIdList)
  },

  // 根据分页器来获取数据
  // GET /admin/product/list/{page}/{limit}
  getSkuByPage(page, limit) {
    return request.get(`${api_name}/list/${page}/${limit}`)
  },

  // POST /admin/product/saveSkuInfo
  // saveSkuInfo
  // POST /admin/product/updateSkuInfo
  // 修改和增加一个数据(同样也是根据 id 来判断是增加还是修改)
  addOrUpdateSku(skuInfo) {
    return request.post(`${api_name}/${skuInfo.id ? 'updateSkuInfo' : 'saveSkuInfo'}`)
  },

  // GET /admin/product/spuImageList/{spuId}
  // getSpuImageList
  // 根据对应的 spuId 获取对应的 spuInfo对象的图片数据列表
  getSpuImageList(spuId) {
    return request.get(`${api_name}/spuImageList/${spuId}`)
  },
  // 跟剧 spuId 获取 spuInfo 对象中对应的销售数据
  // GET /admin/product/spuSaleAttrList/{spuId}
  // getSpuSaleAttrList
  getSpuSaleAttrList(spuId) {
    return request.get(`${api_name}/spuSaleAttrList/${spuId}`)
  }
}