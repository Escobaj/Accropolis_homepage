import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Sondage from '@/components/Sondage'
import Question from '@/components/Question'
import Tendance from '@/components/Tendance'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/question',
      name: 'Question',
      component: Question
    },
    {
      path: '/sondage',
      name: 'Sondage',
      component: Sondage
    },
    {
      path: '/tendance',
      name: 'Tendance',
      component: Tendance
    },
  ]
})
