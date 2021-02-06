<template lang="pug">
.root-continer
  .header(v-if="!login")
    headline(@action="logout")
      user
    navigation
  .container
    .route
    router-view
</template>



<script>
import headline from "./components/headline";
import user from "./components/user";
import navigation from "./components/navigation";

export default {
  components: {
    headline,
    user,
    navigation,
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    logout() {
      localStorage.setItem("token", "");
      this.$router.replace("/login");
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    console.log(token);
    this.loggedIn = token ? true : false;
    console.log(this.loggedIn);
    if (!this.loggedIn && !this.login) this.$router.replace("/login");
  },
  computed: {
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