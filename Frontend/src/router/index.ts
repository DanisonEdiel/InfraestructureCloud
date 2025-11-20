import DashboardLayout from "@/layouts/dashboard/DashboardLayout.vue";
import UserList from "@/views/UserList.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import UserView from "../views/UserView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/dashboard/post-create" },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        name: "post-create",
        path: "post-create",
        component: UserView,
      },
      { name: "post-list", path: "post-list", component: UserList },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
