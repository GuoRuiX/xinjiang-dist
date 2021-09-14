import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
    path: '/pinkunData',
    component: () => import('@/views/pinkun/index'),
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
  }


  // 404 page must be placed at the end !!!
]
export const asyncRoutes = [
  {
    path: '/operation',
    component: Layout,
    name:'operation',
    meta: {
      title: '操作日志',
      icon: 'dashboard',
      roles: ['1']
    },
    children:[
      {
        path: 'Thelog',
        component: () => import('@/views/operation/operationThelog'),
        meta:{
          title:'操作日志'
        }
      }
    ]
  },
  {
    path: '/DataReported',
    component: Layout,
    name:'DataReported',
    meta: {
      title: '数据上报',
      icon: 'dashboard',
      roles: ['2']
    },
    children:[
      {
        path: 'data',
        component: () => import('@/views/DataReported/DataReportedIdenx'),
        meta:{
          title:'数据上报'
        }
      }
    ]
  },

  {
    path: '/StatisticalAnalysis',
    component: Layout,
    name:'statistical',
    meta: {
      title: '统计分析',
      icon: 'dashboard'
    },
    children:[
      {
        path: 'borrowing',
        component: () => import('@/views/StatisticalAnalysis/BorrowingInfo'),
        meta:{
          title:'借贷信息',
          roles: ['1']
        }
      },
      {
        path: 'poor',
        component: () => import('@/views/StatisticalAnalysis/PoorInformation'),
        meta:{
          title:'贫困户信息',
          roles: ['1','2']
        }
      },
      {
        path: 'report',
        component: () => import('@/views/StatisticalAnalysis/report'),
        meta:{
          title:'信用报告',
          roles: ['1','2']
        }
      },
      {
        path: 'statement',
        component: () => import('@/views/StatisticalAnalysis/statement'),
        meta:{
          title:'报表',
          roles: ['1','2']
        }
      },
      {
        path: 'poorcounnty',
        component: () => import('@/views/poorcounty/poorCounty'),
        meta:{
          title:'贫困县',
          roles: ['1']
        }
      }
    ]
  },
  {
    path: '/UserManagement',
    component: Layout,
    name:'UserManagement',

    meta: {
      title: '用户管理',
      icon: 'dashboard',
      roles: ['3']
    },
    children:[
      {
        path: 'user',
        component: () => import('@/views/UserManagement/user'),
        meta:{
          title:'用户管理'
        }
      }
    ]
  },
  {
    path: '/OrgManagement',
    component: Layout,
    name:'OrgManagement',
    meta: {
      title: '机构管理',
      icon: 'dashboard',
      roles: ['3']
    },
    children:[
      {
        path: 'org',
        component: () => import('@/views/OrgManagement/org'),
        meta:{
          title:'机构管理'
        }
      }
    ]
  },
  {
    path: '/warning',
    component: Layout,
    name:'warning',
    meta: {
      title: '预警信息',
      icon: 'dashboard',
      roles: ['1']
    },
    children:[
      {
        path: 'warning',
        component: () => import('@/views/warning/index'),
        meta:{
          title:'预警信息'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
