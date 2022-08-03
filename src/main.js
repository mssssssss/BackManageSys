// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios/index' // 导入axios 
import mock from './mock/index'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  mock,
  //定义全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this // bus可以任意起名
  },
  components: {
    App
  },
  template: '<App/>'
})
