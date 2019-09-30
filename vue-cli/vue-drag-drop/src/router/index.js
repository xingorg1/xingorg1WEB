import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Gjf from '@/components/Gjf'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Gjf',
      component: Gjf
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
