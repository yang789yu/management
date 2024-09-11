import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import { GetUserRoutersApi } from '@/request/api'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainlayout',
    // 懒加载的一种形式
    component: () => import(/* webpackChunkName: "about" */ '../views/layout/MainLayout.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/loginIndex.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem('edb-authorization-token')
  console.log(token);
  // 管理系统常见的两个经典逻辑；
  // 如果用户访问登录页面，但是token已经存在，跳转到首页
  if(to.path === '/login' && token){
    next("/");
    return;
  }

  // 如果用户访问的不是登录页面，但是没有token，跳转到登录页面
  if(to.path !== "/login" && !token){
    next("/login");
    return;
  }
  next();

  // 发送一个请求，位置在方位'/'的时候，而不是在渲染出组件的时候
  // if(token && vuex中的menuData为0)
  if(token && store.state.userMenuData.menuData.length == 0){
    // 还要再最近的函数中写async
    // let GetUserRoutersApiRes = await GetUserRoutersApi();
    // consol.log("GetUserRoutersApiRes为",GetUserRoutersApiRes);
  }

})

export default router
