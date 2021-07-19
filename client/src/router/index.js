import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import ModifyUser from '../views/ModifyUser.vue'
import CreateUser from '../views/CreateUser.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next ({
          name: 'home'
        })
      }
      next()
    }
  },
  {
    path: '/user/edit',
    name: 'edituser',
    component: ModifyUser,
    beforeEnter: (to, from, next) => {
      if (!store.getters['users/editUser']) {
        return next({
          name: 'dashboard'
        })
      }
      next()
    }
  },
  {
    path: '/user/create',
    name: 'createuser',
    component: CreateUser,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
