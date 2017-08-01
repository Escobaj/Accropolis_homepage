import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Sondage from '@/components/Sondage'
import Question from '@/components/Question'
import Document from '@/components/Document'
import ToggleButton from 'vue-js-toggle-button'


Vue.use(ToggleButton)
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
      path: '/document',
      name: 'Document',
      component: Document
    },
  ]
})
