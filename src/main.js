import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// eslint-disable-next-line no-unused-vars
import $ from 'jquery'
// eslint-disable-next-line no-unused-vars
import semantic from '../semantic/dist/semantic'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import preventClick from './utils/controlClickState'

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
