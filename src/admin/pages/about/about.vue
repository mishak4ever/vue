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
        @catEvent="catHandler(category.id, $event)"
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
    this.getUserAction()
      .then((user) => {
        console.log("user", user);
        this.fetchCategoriesAction(user.id);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.data,
      user: (state) => state.user.user,
    }),
  },
  methods: {
    ...mapActions({
      getUserAction: "user/get_user",
      createCategoryAction: "categories/create_category",
      fetchCategoriesAction: "categories/fetch_categories",
      fetchSkillsAction: "skills/fetch_skills",
      addSkillAction: "skills/add_skill",
      editSkillAction: "skills/edit_skill",
      removeSkillAction: "skills/remove_skill",
    }),
    async createCategory(catTitle) {
      try {
        await this.createCategoryAction(catTitle);
        this.showEmptyCat = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    async catHandler(categoryId, event) {
      console.log(event.type);
      switch (event.type) {
        case "removeSkill":
          await this.removeSkillAction({ id: event.data, category: categoryId });
          //
          break;
        case "editSkill":
          console.log(event.data);
          await this.editSkillAction({ ...event.data, category: categoryId });
          event.data.editMode=false;
          //
          break;
        case "addSkill":
          await this.addSkillAction({ ...event.data, category: categoryId });
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