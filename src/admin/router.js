import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import about from "./pages/about.vue";

const routes = [
  {
    path: '/admin',
    component: about
  },
  {
    path: '/admin/:tab',
    component: about
  },

];

export default new VueRouter({routes, mode: 'history'});