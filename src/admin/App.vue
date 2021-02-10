<template lang="pug">
div(:class="[{ 'login-container': login }, { 'root-container': !login }]")
  .header(v-if="!login")
    headline(@action="logout")
      user
    .nav
      navigation
  .page-container
    .route
      router-view
    .tooltip-container(:class="{ active: tooltipIsShown }")
      .notification
        notification(
          :text="tooltipText",
          :type="tooltipType",
          @click="hideTooltip"
        )
</template>



<script>
import headline from "./components/headline";
import user from "./components/user";
import navigation from "./components/navigation";
import notification from "./components/notification";
import $axios from "./axios.js";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    headline,
    user,
    navigation,
    notification,
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide_tooltip",
      refreshToken: "user/refresh_token",
      getUser: "user/get_user",
      dumm: "user/dumm",
    }),
    async logout() {
      // await this.refreshToken();
      // console.log(this.userToken);
      localStorage.setItem("token", "");
      this.$router.replace("/login");
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    this.loggedIn = token ? true : false;
    if (!this.loggedIn && !this.login) this.$router.replace("/login");
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      try {
        console.log(to.path);
        // getUser();
      } catch (error) {
        console.log(error.message);
      }
      // if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
      // else next();
       next();
    });
    $axios.interceptors.request.use(
      function (config) {
        // console.log("request", config);
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    $axios.interceptors.response.use(
      (response) => {
        // console.log("response", response);
        return response;
      },
      (error) => {
        // console.log("error", error.response);
        if (error.response.status == 401) {
          this.refreshToken();
          console.log("Refresh user token");
        }
        if (error.response.status == 400) {
          localStorage.setItem("token", "");
          this.$router.replace("/login");
          console.log("Wrong token");
        }
        return Promise.reject(error);
      }
    );
    // axios.interceptors.request.eject(myInterceptor);
  },
  computed: {
    ...mapState({
      userToken: (state) => state.user.token,
      tooltipIsShown: (state) => state.tooltips.isShown,
      tooltipText: (state) => state.tooltips.text,
      tooltipType: (state) => state.tooltips.type,
    }),
    login() {
      return this.$route.path == "/login" ? true : false;
    },
  },
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss">
</style>