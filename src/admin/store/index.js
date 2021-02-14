import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import categories from "./modules/categories.js";
import skills from "./modules/skills.js";
import user from "./modules/user.js";
import tooltips from "./modules/tooltips.js";
import works from "./modules/works.js";
import reviews from "./modules/reviews.js";
import window from "./modules/window.js";

export default new Vuex.Store({
  modules: {
    reviews,
    categories,
    works,
    skills,
    user,
    tooltips,
    window,
  },
});
