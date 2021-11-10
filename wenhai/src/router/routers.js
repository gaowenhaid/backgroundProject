/*
 * @Date: 2021-11-10 16:03:51
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-10 16:32:41
 * @FilePath: \VueBackgroundProject\wenhai\src\router\routers.js
 */
/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },
    {
        path: '/product',
        name: 'product',
        component: Layout,
        meta: { title: '商品管理', icon: 'el-icon-s-shop' },
        redirect: '/product/category/list',
        children: [
            // 注册分类管理路由组件
            {
                path: 'category/list',
                name: 'category',
                component: () => import('@/views/product/Category')
                , meta: {title:'分类管理'}
            },
            // 注册品牌管理的路由板块
            {
                path: 'trademark/list',
                name: 'trademark',
                component: () => import('@/views/product/Trademark')
                , meta: {title:'品牌管理'}
            },
            // 注册平台属性的路由板块
            {
                path: 'attr/list',
                name: 'attr',
                component: () => import('@/views/product/Attr')
                , meta: {title:'平台属性管理'}
            },
            // spu 管理路由
            {
                path: 'spu/list',
                name: 'spu',
                component: () => import('@/views/product/Spu')
                , meta: {title:'Spu管理'}
            },
            // sku 管理路由
            {
                path: 'sku/list',
                name: 'sku',
                component: () => import('@/views/product/Sku')
                , meta: {title:'Sku管理'}
            },
        ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]