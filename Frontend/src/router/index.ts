import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import UserView from "../views/UserView.vue";
import UserList from "@/views/UserList.vue";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout.vue";
import PostDemo from "@/views/PostDemo.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/dashboard/post-list" },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      { name: "dashboard", path: "", component: PostDemo },
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
