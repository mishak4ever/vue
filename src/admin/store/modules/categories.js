export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),

    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map((category) => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }
        return category;
      });
    },
    REMOVE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map((category) => {
        if (category.id === skillToRemove.category) {
          category.skills = category.skills.filter(
            (skill) => skill.id !== skillToRemove.id
          );
        }
        return category;
      });
    },
    EDIT_SKILL: (state, skillToEdit) => {
      const editSkillInCategory = (category) => {
        category.skills = category.skills.map((skill) => {
          return skill.id === skillToEdit.id ? skillToEdit : skill;
        });
      };

      const findCategory = (category) => {
        if (category.id === skillToEdit.category) {
          editSkillInCategory(category);
        }

        return category;
      };
      state.data = state.data.map(findCategory);
    },
    EDIT_CATEGORY: (state, catToEdit) => {
      state.data = state.data.map((category) => {
        if (category.id === catToEdit.id) {
          category.title = catToEdit.title;
        }
        return category;
      });
    },
    DELETE_CATEGORY: (state, catToDelete) => {
      state.data = state.data.filter(
        (category) => category.id !== catToDelete.id
      );
    },
  },
  actions: {
    async create_category(store, title) {
      try {
        const response = await this.$axios.post("/categories", { title });
        store.commit("categories/ADD_CATEGORY", response.data, { root: true });
        return response.data;
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async edit_category(store, category) {
      try {
        const response = await this.$axios.post("/categories/" + category.id, {
          title: category.title,
        });
        store.commit("categories/EDIT_CATEGORY", category, { root: true });
        return response.data;
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async delete_category(store, category) {
      try {
        const response = await this.$axios.delete("/categories/" + category.id);
        store.commit("categories/DELETE_CATEGORY", category, { root: true });
        return response.data;
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async fetch_categories(store, userId) {
      try {
        const response = await this.$axios.get("/categories/" + userId);
        store.commit("categories/SET_CATEGORIES", response.data, {
          root: true,
        });
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
  },
};
