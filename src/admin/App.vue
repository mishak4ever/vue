<template lang="pug">
.root-continer
  headline 
    user
  navigation
  .admin-content.container
    .content-container
      .header
        .title Блок Обо мне
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
import headline from "./components/headline";
import user from "./components/user";
import navigation from "./components/navigation";
import iconedBtn from "./components/button/types/iconedBtn";
import category from "./components/category";

export default {
  components: {
    headline,
    user,
    navigation,
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
    this.categories = require("./json/data.json");
  },
  methods: {
    catHandler(event) {
      console.log(event);
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