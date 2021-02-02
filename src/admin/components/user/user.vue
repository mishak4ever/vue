<template lang="pug">
.user-component
  avatar(size="2.7", :src="userAva")
  .username Владимир Астаханов
</template>

<script>
import avatar from "../avatar";

export default {
  components: {
    avatar,
  },
  computed: {
    userAva() {
      return require("../../../images/content/user.jpg").default;
    },
  },
};
</script>

<style lang="postcss" scoped src="./user.pcss"></style>