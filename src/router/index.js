import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/home/Category'),
        meta: { title: '分类', keepAlive: false }
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/home/Cart'),
        meta: { title: '购物车', keepAlive: false }
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/home/User'),
        meta: { title: '我的', keepAlive: false }
      },

    ]
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('@/views/Details/Details'),
    meta: { title: '', keepAlive: false }
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
