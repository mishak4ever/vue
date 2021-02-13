<template lang="pug">
card(simple)
  .reviews-wrapper
    .review-header
      .avatar
        avatar(size="2.7", :src="userAva")
      .title 
        .author {{ review.name }}
        //- .author {{ review.author }}
        .occ {{ review.occ }}
    .data
      .text
        p {{ review.text }}
      .btns
        icon(symbol="pencil", title="Править", @click="handleChange")
        icon(symbol="trash", title="Удалить", @click="handleDelete")
</template>

<script>
import card from "../Card";
import avatar from "../avatar";
import icon from "../icon";
export default {
  components: { card, icon, avatar },
  props: {
    review: Object,
  },
  computed: {
    userAva() {
      // return `https://webdev-api.loftschool.com/${this.review.photo}`;
      return require(`../../../images/content/${this.review.pic}`).default;
    },
  },
  mounted() {
    //..
  },
  methods: {
    handleChange() {
      this.$emit("change", this.review);
    },
    handleDelete() {
      this.$emit("delete", this.review);
    },
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>