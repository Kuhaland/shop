import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import Dashboard from '@/pages/Dashboard.vue'

const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      layout: 'auth',
    },
  },

  {
    path: '/forgot-password',
    component: ForgotPassword,
    meta: {
      layout: 'auth',
    },
  },

  {
    path: '/',
    component: Dashboard,
    meta: {
      layout: 'default',
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {

  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  return true
})

export default router
