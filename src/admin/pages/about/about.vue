<template lang="pug">
.admin-content(v-if="categories.length")
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
.loading-content(v-else) Загрузка...
</template>


<script>
import iconedBtn from "../../components/button";
import category from "../../components/category";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    iconedBtn,
    category,
  },
  data() {
    return {
      // categories: ["Категория1", "Категория2", "Категория3"],
      showEmptyCat: false,
    };
  },
  created() {
    // this.$store.dispatch('categories/fetch');
    this.fetchCategoriesAction();
    this.categories = require("../../json/data.json");
  },
  computed: {
    ...mapState("categories", {
      categories: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create_category",
      fetchCategoriesAction: "categories/fetch_categories",
    }),
    async createCategory(catTitle) {
      try {
        await this.createCategoryAction(catTitle);
        this.showEmptyCat=false;
      } catch (error) {
        console.log(error.message);
      }
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