<template lang="pug">
.admin-content
  .content-container
    .header
      .title Блок Обо мне {{ $route.params }}
      iconed-btn(
        type="iconed",
        title="Добавить группу",
        @click="showEmptyCat = true",
        v-if="!showEmptyCat"
      )
  ul.skills
    li.item(v-if="showEmptyCat")
      category(
        empty,
        @remove="showEmptyCat = false",
        @approve="createCategory($event)"
      )
    li.item(v-for="category in categories", :key="category.id")
      category(
        :title="category.category",
        :skills="category.skills",
        @catEvent="catHandler($event)"
      )
</template>


<script>
import iconedBtn from "../../components/button";
import category from "../../components/category";
import { mapActions } from "vuex";

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
    this.fetchCategoriesAction();
    this.categories = require("../../json/data.json");
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoriesAction: "categories/fetch"
    }),
    createCategory(catTitle) {
      this.createCategoryAction(catTitle)
      // console.log(catTitle);
    },
    catHandler(event) {
      console.log(event.type);
      switch (event.type) {
        case "removeSkill":
          console.log(event.data);
          //
          break;
        case "editSkill":
          //
          break;
        case "addSkill":
          //
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="postcss" scoped src="./about.pcss">
</style>