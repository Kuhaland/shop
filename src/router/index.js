import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'

const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      layout: 'empty',
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
  history: createWebHistory('/shop/'),
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
