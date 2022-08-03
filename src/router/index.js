import Vue from 'vue'
import Router from 'vue-router'

import Main from '../components/Main.vue'
import Home from '../components/admin/Home.vue'
import User from '../components/admin/User.vue'
import Product from '../components/admin/Product.vue'
import Page1 from '../components/admin/Page1.vue'
import Page2 from '../components/admin/Page2.vue'
import Login from '../components/Login.vue'
import Error from '../components/404.vue'

import store from '../store/index'

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'Main',
    component: Main,
    title: "管理主页面",
    redirect: '/home',
    children: [{  //嵌套子路由
        path: '/home',
        name: 'home',
        component: Home,
        title: "主页",
      },
      {
        path: '/product',
        name: 'product',
        component: Product,
        title: "商品",
      },
      {
        path: '/user',
        name: 'user',
        component: User,
        title: "用户",
      },
      {
        path: '/page1',
        name: 'page1',
        component: Page1,
        title: "页面1",
      },
      {
        path: '/page2',
        name: 'page2',
        component: Page2,
        title: "页面2",
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    title: "登录",
  },{
    // 配置404页面
    // 其他无关请求，都将走向404页面
    path:'*',
    name:'404',
    component: Error
  }
]


const router=new Router({
  mode: 'history',
  routes
})

// 路由导航守卫控制访问权限
// 为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  console.log(store.state.token);
  // 如果用户访问的登录页或者有登录token，直接放行
  if (to.name === 'login' || store.state.token ){
    next()
  }
  // 否则（即没有登录过的用户要访问别的页面，就要跳到登录页面先）
  else {
    next({name:'login'})
  }
})


export default router
