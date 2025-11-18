import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import UserView from '../views/UserView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/user' },
  { path: '/user', component: UserView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})