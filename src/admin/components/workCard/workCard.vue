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
        icon(symbol="pencil", title="Править", @click="handleChange")
        icon(symbol="trash", title="Удалить", @click="handleDelete")
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
    handleChange() {
      this.$emit("change", this.work);
    },
    handleDelete() {
      this.$emit("delete", this.work);
    },
  },
};
</script>

<style scoped lang="postcss" src="./workCard.pcss"></style>