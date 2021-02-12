import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import categories from "./modules/categories.js";
import skills from "./modules/skills.js";
import user from "./modules/user.js";
import tooltips from "./modules/tooltips.js";
import works from "./modules/works.js";

export default new Vuex.Store({
  modules: {
    categories,
    works,
    skills,
    user,
    tooltips,
  },
});
