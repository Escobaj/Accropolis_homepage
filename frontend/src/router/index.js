import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '@/components/Home';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
  ],
});
