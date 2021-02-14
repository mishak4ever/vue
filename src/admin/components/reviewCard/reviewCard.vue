<template lang="pug">
card()
  //- .reviews-wrapper
  .review-header(slot="title")
    .avatar
      avatar(size="2.7", :src="userAva")
    .title 
      .author {{ review.author }}
      .occ {{ review.occ }}
  .data(slot="content")
    .text
      p {{ review.text }}
    .btns
      icon(symbol="pencil", title="Править", @click="$emit('change', review)")
      icon(symbol="cross", title="Удалить", @click="$emit('delete', review)")
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
      return `https://webdev-api.loftschool.com/${this.review.photo}`;
      // return require(`../../../images/content/hero_photo.png`).default;
    },
  },
  mounted() {
    //..
  },
  methods: {
    //..
  },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>