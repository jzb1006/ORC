import Vue from 'vue'
import App from './App'
import ajax from '@/utils/ajax';//导入封装好的net
Vue.config.productionTip = false
Vue.prototype.$ajax = ajax;
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
