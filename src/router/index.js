import { createRouter, createWebHistory } from "vue-router";

import NProgress from "nprogress/nprogress.js";

// Main layouts
import LayoutBackend from "@/layouts/variations/Backend.vue";
import LayoutSimple from "@/layouts/variations/Simple.vue";
import { useAuthStore } from "../stores/auth";
//Auth layout
const AuthLogin = () => import("@/views/auth/Login.vue");
const AuthRecover = () => import("@/views/auth/RecoverPassword.vue");
const ChangePassword = () => import("../views/auth/ChangePassword.vue");

const ProfileView = () => import("@/views/Profile.vue");
const AttendanceView = () => import("@/views/Attendance.vue");

const NotFound = () => import("@/views/error/NotFound.vue");
const NotAllowed = () => import("@/views/error/NotAllowed.vue");

// Backend: Dashboard
const Dashboard = () => import("@/views/Home.vue");

// Set all routes
const routes = [
  {
    path: "/",
    redirect: "/home",
    component: LayoutBackend,
    children: [
      {
        path: "home",
        name: "home",
        component: Dashboard,
      },
      {
        path: "profile",
        name: "profile",
        component: ProfileView,
      },
      {
        path: "attendance",
        name: "attendance",
        component: AttendanceView,
      },
    ],
  },
  {
    path: "/auth",
    component: LayoutSimple,
    children: [
      {
        path: "login",
        name: "login",
        component: AuthLogin,
      },
      {
        path: "recover",
        name: "recover",
        component: AuthRecover,
      },
      {
        path: "change-password/:id",
        name: "changepassword",
        component: ChangePassword,
      },
    ],
  },
  {
    path: "/",
    component: LayoutSimple,
    children: [
      {
        path: "notallowed",
        name: "notallowed",
        component: NotAllowed,
      },
      {
        path: ":pathMatch(.*)*",
        name: "not_found",
        component: NotFound,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeResolve((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

router.beforeEach((to, from) => {
  const publicPages = ["login", "recover", "changepassword"];
  const authRequired = !publicPages.includes(to.name);
  const auth = useAuthStore();

  if (authRequired) {
    if (!auth.token) {
      auth.returnUrl = to.fullPath;
      return { name: "login" };
    }
  } else {
    if (!authRequired) {
      if (auth.token) {
        return { name: "home" };
      }
    }
  }
});

export default router;
