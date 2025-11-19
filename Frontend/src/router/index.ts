import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import UserView from '../views/UserView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/user' },
  { path: '/user', component: UserView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//marcador
router.afterEach((to, from) => {
  fetch("https://gentle-breeze-d28f.jonasanchez1993.workers.dev/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "frontend",
      ruta: "http://localhost:5173"
    })
  });
});

export default router;