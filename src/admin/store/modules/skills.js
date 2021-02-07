export default {
  namespaced: true,
  actions: {
    async add_skill(store, skill) {
      try {
        const response = await this.$axios.post("/skills", skill);
        store.commit("categories/ADD_SKILL", response.data, { root: true });
      } catch (error) {
        throw new Error("ошибка добавления Скила");
      }
    },
    async edit_skill(store, skill) {
      try {
        console.log("skill",skill);
        const response = await this.$axios.post("/skills/" + skill.id,skill);
        store.commit("categories/EDIT_SKILL", skill, { root: true });
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async remove_skill(store, skill) {
      try {
        const response = await this.$axios.delete("/skills/" + skill.id);
        store.commit("categories/REMOVE_SKILL", skill, { root: true });
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
  },
};
