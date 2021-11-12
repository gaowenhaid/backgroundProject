/*
 * @Date: 2021-11-10 16:44:50
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-12 17:05:43
 * @FilePath: \wenhai\src\api\product\attr.js
 */
// 所有与 attr(属性) 相关的接口函数
// 引入二次封装的 axios
import request from '@/utils/request'
// 定义公共的name
const api_name = '/admin/product'
export default {
    //     商品基础属性接口 : Base Manage ControllerShow/HideList OperationsExpand Operations
    // 根据一级菜单和二级菜单
    // GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
    // attrInfoList
    getAttrInfoList(category1Id,category2Id,category3Id){
        return request.get(`${api_name}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
    },
    // DELETE /admin/product/deleteAttr/{attrId}
    // deleteAttr
    // 根据 id 删除属性
    deleteAttr(attrId){
        return request.delete(`${api_name}/deleteAttr/${attrId}`)
    },
    // GET /admin/product/getAttrValueList/{attrId}
    // getAttrValueList
    // 根据指定属性的 id 获取属性的数组
    getAttrValueList(attrId){
        return request.get(`${api_name}/getAttrValueList/${attrId}`)
    },
    // POST /admin/product/saveAttrInfo
    // 添加或修改属性
    saveAttrInfo(attrInfo){
        return request.post(`${api_name}/saveAttrInfo`,attrInfo)
    }
}