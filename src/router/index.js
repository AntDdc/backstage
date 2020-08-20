import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
   redirect:'/login'
  },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/home',
      redirect:'/users'
    },
    {
      path:'/home',
      name:'home',
      component: () => import('../views/home.vue'),
      children:[
        {
          path:'/users',
          name:'users',
          component:() => import('../views/users.vue')
        },
        {
          path:'/rights',
          name:'rights',
          component:() => import('../views/rights.vue')
        },
        {
          path:'/roles',
          name:'roles',
          component:() => import('../views/roles.vue')
        }
      ]
    },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
