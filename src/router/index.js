import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login.vue'

const routes = [
  {
    path: '/',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory('/shop/'),
  routes,
})

export default router
