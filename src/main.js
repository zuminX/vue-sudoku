import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import semantic from '../semantic/dist/semantic'
import './plugins/element.js'
import preventClick from './utils/controlClickState'
import '@/icons'

import '@/assets/styles/index.scss'

Vue.config.productionTip = false
Vue.use(preventClick)

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
