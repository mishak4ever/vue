<template lang="pug">
.root-continer
  headline 
    user
  navigation
  .admin-content
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
        category(:title="category.category", :skills="category.skills")
</template>

<script>
import headline from "./components/headline";
import user from "./components/user";
import navigation from "./components/navigation";
import iconedBtn from "./components/button";
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
};
</script>

<style lang="postcss">
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss">
</style>