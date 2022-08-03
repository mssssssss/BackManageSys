import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //这里放全局参数
    currentMenu: null, //默认当前菜单为’主页‘（面包屑默认显示’主页‘） //保存面包屑显示的信息
    tabsList: [{  //保存打开的标签页信息
      path: '/home',
      name: 'home',
      label: "主页",  //默认的标签页为’主页‘
    }],
    token:''
  },
  mutations: {
    //选择标签 选择面包屑
    selectMenu(state, val) {
      if (val.name === 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        //如果等于-1，说明tabsList不存在这个菜单项那么就插入它，否则什么都不做
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ''
      }
    },

    // 设置登录token
    setToken(state,val){
      state.token=val
      // 保存到cookie中
      cookie.set('token',val)
    },
    //获得登录token(先从store中获取，如果没有在从cookie中获取)
    getToken(state){
      state.token= state.token ||  cookie.get('token')
    },
    
    //清空登录token
    clearToken(state){
      state.token=''
      cookie.remove('token')
    }
  },
  getters: {
    //这里是get方法 
    // getTagValue: state => state.tagInfo  
  },
  actions: {
    //这个部分我暂时用不上
  },
  modules: {
    //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
  },

})

Vue.prototype.$store = store
export default store
