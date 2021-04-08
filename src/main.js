import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
// import Vant from 'vant'
// 引入vant css样式
// import 'vant/lib/index.css'
// 引入浏览器设配插件   lib-flexible 用于动态设置 rem 基准值
import 'amfe-flexible'
// Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
