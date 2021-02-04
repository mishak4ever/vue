<template lang="pug">
.root-continer
  headline 
    user
  navigation
  .container
    router-view
</template>



<script>
import headline from "./components/headline";
import user from "./components/user";
import navigation from "./components/navigation";
import about from "./pages/about.vue";

export default {
  components: {
    headline,
    user,
    navigation,
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