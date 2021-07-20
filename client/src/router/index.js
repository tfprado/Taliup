import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import ModifyUser from '../views/ModifyUser.vue'
import CreateUser from '../views/CreateUser.vue'
import CompanyDashboard from '../views/CompanyList.vue'
import ModifyCompany from '../views/CompanyEdit.vue'
import CreateCompany from '../views/CompanyCreate.vue'
import AddCompanyUser from '../views/AddCompanyUser.vue'
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
  {
    path: '/company-dashboard',
    name: 'companydashboard',
    component: CompanyDashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'home'
        })
      }
      next()
    }
  },
  {
    path: '/company/edit',
    name: 'editcompany',
    component: ModifyCompany,
    beforeEnter: (to, from, next) => {
      if (!store.getters['company/editCompany']) {
        return next({
          name: 'companydashboard'
        })
      }
      next()
    }
  },
  {
    path: '/company/create',
    name: 'createcompany',
    component: CreateCompany,
  },
  {
    path: '/company/relations',
    name: 'addcompanyuser',
    component: AddCompanyUser,
    beforeEnter: (to, from, next) => {
      if (!store.getters['company/editCompany']) {
        return next({
          name: 'companydashboard'
        })
      }
      next()
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
