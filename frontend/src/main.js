// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jQuery from 'jquery';
import Vue from 'vue';
import App from './App';
import router from './router';
import Toasted from 'vue-toasted'
import VueSocketio from 'vue-socket.io';
import vmodal from 'vue-js-modal'

window.jQuery = jQuery;
window.$ = jQuery;

Vue.use(Toasted, {duration : 2000});
Vue.use(VueSocketio, 'http://192.168.0.78:4000');
Vue.use(vmodal);


require('motion-ui');
require('what-input');
require('foundation-sites');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
