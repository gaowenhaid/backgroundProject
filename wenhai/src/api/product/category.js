/*
 * @Date: 2021-11-10 16:44:50
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-12 16:53:00
 * @FilePath: \wenhai\src\api\product\category.js
 */
// 所有与 category 相关的接口函数
// 引入 二次封装的 axios
import request from '@/utils/request'
// 定义公共变量名字
const api_name = '/admin/product'
export default {
    //     /admin/product/getCategory1
    // getCategory1
    // 获取一级分类的接口函数
    getCategory1(){
        return request.get(`${api_name}/getCategory1`)
    },
    // 获取二级分类的菜单
    // GET /admin/product/getCategory2/{category1Id}
    // getCategory2
    getCategory2(category1Id){
        return request.get(`${api_name}/getCategory2/${category1Id}`)
    },
    // 获取三级分类的菜单
    // GET /admin/product/getCategory3/{category2Id}
    getCategory3(category2Id){
        return request.get(`${api_name}/getCategory3/${category2Id}`)
    }
}