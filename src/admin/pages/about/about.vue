<template lang="pug">
.admin-content(v-if="categories.length")
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
        category(
          empty,
          @remove="showEmptyCat = false",
          @approve="createCategory($event)"
        )
      li.item(v-for="category in categories", :key="category.id")
        category(
          :title="category.category",
          :skills="category.skills",
          @catEvent="catHandler(category.id, $event)",
          @remove="deleteCategory(category.id)",
          @approve="editCategory(category.id, $event)"
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
      showEmptyCat: false,
    };
  },
  created() {
    this.getUserAction()
      .then((user) => {
        this.fetchCategoriesAction(user.id);
      })
      .catch((error) => {
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
      showTooltip: "tooltips/show_tooltip",
      hideTooltip: "tooltips/hide_tooltip",
      getUserAction: "user/get_user",
      createCategoryAction: "categories/create_category",
      fetchCategoriesAction: "categories/fetch_categories",
      deleteCategoryAction: "categories/delete_category",
      editCategoryAction: "categories/edit_category",
      fetchSkillsAction: "skills/fetch_skills",
      addSkillAction: "skills/add_skill",
      editSkillAction: "skills/edit_skill",
      removeSkillAction: "skills/remove_skill",
    }),
    async createCategory(category) {
      try {
        await this.createCategoryAction(category.title);
        this.showEmptyCat = false;
        this.fetchCategoriesAction(this.user.user.id);
        this.showTooltip({
          text: `Добавлена категория ${category.title}`,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    async editCategory(categoryId, category) {
      try {
        let resp = await this.editCategoryAction({
          id: categoryId,
          title: category.title,
        });
        category.editmode = false;
        this.showTooltip({
          text: resp.message,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    async deleteCategory(categoryId, category) {
      try {
        let resp = await this.deleteCategoryAction({ id: categoryId });
        this.showTooltip({
          text: resp.message,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
    async catHandler(categoryId, event) {
      let tooltipText = "";
      try {
        switch (event.type) {
          case "removeSkill":
            await this.removeSkillAction({
              id: event.data,
              category: categoryId,
            });
            tooltipText = `Удален скилл`;
            break;
          case "editSkill":
            await this.editSkillAction({ ...event.data, category: categoryId });
            event.data.editMode = false;
            tooltipText = `Отредактирован скилл`;
            break;
          case "addSkill":
            await this.addSkillAction({ ...event.data, category: categoryId });
            tooltipText = `Добавлен скилл`;
            break;
          default:
            break;
        }
        this.showTooltip({
          text: tooltipText,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="postcss" scoped src="./about.pcss">
</style>