<template lang="pug">
card(simple)
  .works-wrapper
    .pic
      img.image(:src="cover")
      .tag
        tags-list(:tags="work.techs")
    .data
      .title {{ work.title }}
      .text
        p {{ work.description }}
      a.link(:href="work.link") {{ work.link }}
      .btns
        icon(symbol="pencil", title="Править", @click="$emit('change', work)")
        icon(symbol="cross", title="Удалить", @click="$emit('delete', work)")
</template>

<script>
import card from "../Card";
import icon from "../icon";
import tagsList from "../tagsList";
export default {
  components: { card, icon, tagsList },
  props: {
    work: Object,
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`;
    },
  },
  mounted() {
    //..
  },
  methods: {
    // ..
  },
};
</script>

<style scoped lang="postcss" src="./workCard.pcss"></style>