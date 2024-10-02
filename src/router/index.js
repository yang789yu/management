import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { GetUserMenuDataApi } from '@/request/api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainlayout',
    // 懒加载的一种形式
    component: () => import('../views/layout/MainLayout.vue'),
    redirect:"/home",
    children:[
      // {
      //   path:"/home",
      //   component: () => import('../views/HomeView.vue'),
      // },
      // {
      //   path:"/customer/customer",
      //   component: () => import('../views/customer/CustomerView.vue'),
      // },
      // {
      //   path:"/customer/visit",
      //   component: () => import('../views/customer/VisitView.vue'),
      // },
      // {
      //   path:"/flow/definition",
      //   component: () => import('../views/flow/DefinitionView.vue'),
      // },
      // {
      //   path:"/business/appointment",
      //   component: () => import('../views/business/appointmentView.vue'),
      // },
      // {
      //   path:"/business/service",
      //   component: () => import('../views/business/serviceView.vue'),
      // },
      // {
      //   path:"/business/statement",
      //   component: () => import('../views/business/statementView.vue'),
      // },
    ]
  },
  {
    path: '/test',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/loginIndex.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/registerIndex.vue')
  },
  {
    path: '*',
    component: () => import('../views/404View.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem('edb-authorization-token')
  // 管理系统常见的两个经典逻辑；
  // 如果用户访问登录页面，但是token已经存在，跳转到首页
  console.log("查看一下to.path");
  console.log(to.path);
  if(to.path === '/login' && token){
    console.log("有token，跳转到其他界面")
    next("/");
    return;
  }

  // 如果用户访问的不是登录页面，但是没有token，跳转到登录页面
  if(to.path !== "/login" && !token){
    if(to.path === '/register') next();
    else next("/login");
    return;
  }


  // 发送一个请求，位置在方位'/'的时候，而不是在渲染出组件的时候
  // if(token && vuex中的menuData为0)
  // js中获取vuex的数据通过store.state.文件夹名称.数据
  if(token && store.state.userMenuData.menuData.length == 0){
    console.log("进入生成动态用户数据");
    let newUserMenuData = [{title:"首页",path:"/home",icon:"dashboard"}]
    GetUserMenuDataApi()
    .then(res => {
      console.log('请求到的menudata数据如下：');
      console.log(res);
      if(!res) return;
      let ret =  res.data.map(item => {
        if(item.children){
          return {
            title:item.meta.title,
            path:item.path,
            children: item.children.map(sitem => {
              return {
                title:sitem.meta.title,
                path:item.path+sitem.path
              }
            })
          }
        }else{
          return {
            title:item.meta.title,
            path:item.path,
          }
        }
      })
      newUserMenuData = [...newUserMenuData,...ret];
      // console.log("最终数据：");
      // console.log(newUserMenuData);
      // store.commit("文件夹名称/方法名",参数)
      store.commit("userMenuData/changeMenuData",newUserMenuData);

      // 动态路由生成
      let newChildrenRoutes= [{
        path:"/home",
        meta:{titles:["首页"]},
        component: () => import('../views/HomeView.vue'),
      },
      {
        path:"/profile",
        meta:{titles:["个人中心"]},
        component: () => import('../views/ProfileIndex.vue'),
      }
    ]
      res.data.forEach(item => {
        let ret = item.children.map(sitem => {
          return {
            path:item.path+sitem.path,
            component: () => import(`../views${item.path}/${sitem.name}.vue`),
            meta:{
              titles:[item.meta.title,sitem.meta.title]
            }
          }
        })

        newChildrenRoutes = [...newChildrenRoutes,...ret]
      });
      console.log("动态路由数组")
      console.log(newChildrenRoutes);

      // 将生成好的动态路由添加到mainlayout路由里面的children,作为子路由
      // router.addRoute('父路由名称',单个子路由对象);
      newChildrenRoutes.forEach( item => {
        router.addRoute("mainlayout",item);
      });

      // 如果直接next(),路由还没有完整，还是空的
      // 使用to.path重新进入到一开始的请求中，重新进入路由守卫
      console.log("重新走路由");

      router.push(to.path)
      // next(to.path);
      return ;


    }).catch(err => {
      if(err.response) {
        console.log("登录失败！",err.response.data.message);
      }else {
        console.log("请求错误!", err.message);
      }
    })  
  }
  else next();
})

export default router
