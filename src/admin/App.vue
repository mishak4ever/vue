<template lang="pug">
.root-continer
  .header(v-if="!login")
    headline 
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
  // mixins: [require('simple-vue-validator').mixin],
  components: {
    headline,
    user,
    navigation,
  },
  computed: {
    login() {
      return this.$route.path == "/login" ? true : false;
    },
  },
  mounted() {
    // console.log(this.$route);
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