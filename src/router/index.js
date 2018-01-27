import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEvent from '@/components/NewEvent'
import EditEvent from '@/components/EditEvent'
import ViewEvent from '@/components/ViewEvent'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },

    {
      path: '/new',
      name: 'new-event',
      component: NewEvent
    },

    {
      path: '/view/:event_id',
      name: 'view-event',
      component: ViewEvent
    },

    {
      path: '/edit/:event_id',
      name: 'edit-event',
      component: EditEvent
    }
  ]
})
