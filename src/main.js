import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload } from 'vant';
import './assets/iconfont/iconfont.js'
import './assets/iconfont/icon.css'

Vue.config.productionTip = false
Vue.use(Lazyload);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
