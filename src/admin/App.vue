<template lang="pug">
.root-container
  .header(v-if="!login")
    headline(@action="logout")
      user
    navigation
  .container
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
    }),
    logout() {
      localStorage.setItem("token", "");
      this.$router.replace("/login");
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    this.loggedIn = token ? true : false;
    if (!this.loggedIn && !this.login) this.$router.replace("/login");
  },
  computed: {
    ...mapState("tooltips", {
      tooltipIsShown: (state) => state.isShown,
      tooltipText: (state) => state.text,
      tooltipType: (state) => state.type,
    }),
    login() {
      return this.$route.path == "/login" ? true : false;
    },
  },
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss">
</style>