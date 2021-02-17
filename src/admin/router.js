import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("./pages/about/about.vue"),
  },
  {
    path: "/login",
    component: () => import("./pages/login/login.vue"),
  },
  {
    path: "/about",
    component: () => import("./pages/about/about.vue"),
  },
  {
    path: "/works",
    component: () => import("./pages/works/works.vue"),
  },
  {
    path: "/reviews",
    component: () => import("./pages/reviews/reviews.vue"),
  },
];

export default new VueRouter({ routes });
