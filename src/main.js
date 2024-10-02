import Vue from 'vue'
import 'reset-css'   // 放在最前，清除默认样式
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import dataV from '@jiaminghi/data-view'

Vue.use(dataV)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
