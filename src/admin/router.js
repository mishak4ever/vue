import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import about from "./pages/about/about.vue";
import login from "./pages/login/login.vue";

const routes = [
  {
    path: '/',
    component: about
  },
  {
    path: '/login',
    component: login
  },

];

export default new VueRouter({routes});