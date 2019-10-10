import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/profile/:id',
    //   name: 'profile',
    //   props: (route) => ({ address: route.params.id }),
    //   component: () => import('./views/Profile.vue')
    // }
  ]
})

export default router;