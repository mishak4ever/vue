import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import SimpleVueValidation from "simple-vue-validator";

Vue.use(SimpleVueValidation, { mode: "manual" });

new Vue({
  el: "#app-root",
  router,
  render: (h) => h(App),
});
