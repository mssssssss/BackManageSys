import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios=axios // 将axios包挂载到vue的原型对象上，使得vue的每一个组件能够通过this访问$axios,从而发起ajax请求.
// axios.defaults.baseURL='/test' // 设置请求的根路径

export default axios