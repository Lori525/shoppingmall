import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home/Home'
import Homecon from '@/views/home/homecon/Homecon'
import Category from '@/views/home/category/Category'
import Cart from '@/views/home/cart/Cart'
import Profile from '@/views/home/profile/Profile'
import goodsList from '@/views/goodslist/goodsList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect:'/home/homecon',
    children: [
      {
        path: 'homecon',
        component: Homecon
      },
      {
        path: 'category',
        component: Category
      },
      {
        path: 'cart',
        component: Cart
      },
      {
        path: 'profile',
        component: Profile
      },
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: goodsList//() => import('@/views/goodslist/goodsList.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/goodsdetail/goodsDetails')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/search')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
