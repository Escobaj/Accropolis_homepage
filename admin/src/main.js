// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueX from 'vuex'
import VModal from 'vue-js-modal'


Vue.config.productionTip = true
Vue.use(vueX)
Vue.use(VModal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
