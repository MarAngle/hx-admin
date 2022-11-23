import Vue from 'vue'
import App from './pages/index/App.vue'
import router from './pages/index/router'
import './antd/index'
import './main/index'
import './permission/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
