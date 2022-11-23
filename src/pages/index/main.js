import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './main/index'
import './permission/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
