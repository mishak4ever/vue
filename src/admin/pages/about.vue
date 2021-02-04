<template lang="pug">
.admin-content
  .content-container
    .header
      .title Блок Обо мне {{$route.params}}
      iconed-btn(
        type="iconed",
        title="Добавить группу",
        @click="showEmptyCat = true",
        v-if="!showEmptyCat"
      )
  ul.skills
    li.item(v-if="showEmptyCat")
      category(empty, @remove="showEmptyCat = false")
    li.item(v-for="category in categories", :key="category.id")
      category(
        :title="category.category",
        :skills="category.skills",
        @catEvent="catHandler($event)"
      )
</template>


<script>
import iconedBtn from "../components/button";
import category from "../components/category";

export default {
  components: {
    iconedBtn,
    category,
  },
  data() {
    return {
      categories: ["Категория1", "Категория2", "Категория3"],
      showEmptyCat: false,
    };
  },
  created() {
    this.categories = require("../json/data.json");
  },
  methods: {
    catHandler(event) {
      console.log(event);
    },
  },
};
</script>

<style lang="postcss" scoped src="./about.pcss">

</style>