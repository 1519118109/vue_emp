// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
// 导包
import axios from "axios"
// 将axios注入到Vue的实例中
Vue.prototype.$axios = axios
// 全局样式
import "../static/css/style.css"
Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
