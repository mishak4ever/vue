import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// import reviews from "./modules/reviews.js";
// import skills from "./modules/skills.js";
import user from "./modules/user.js";
import tooltips from "./modules/tooltips.js";
// import works from "./modules/works.js";
// import categories from "./modules/categories.js";
import window from "./modules/window.js";

export default new Vuex.Store({
  modules: {
    user,
    window,
    tooltips,
  },
});