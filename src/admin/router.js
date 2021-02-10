import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import about from "./pages/about/about.vue";
import login from "./pages/login/login.vue";
import works from "./pages/works/works.vue";
import reviews from "./pages/reviews/reviews.vue";

const routes = [
  {
    path: '/',
    component: about
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/about',
    component: about
  },
  {
    path: '/works',
    component: works
  },
  {
    path: '/reviews',
    component: reviews
  },

];

export default new VueRouter({routes});