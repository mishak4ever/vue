export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
  },
  actions: {
    async create_category(store, title) {
      try {
        const response = await this.$axios.post("/categories", { title });
        store.commit("categories/ADD_CATEGORY", response.data, { root: true });
      } catch (error) {
        console.log(error);
        throw new Error("произошла ошибка");
      }
    },
    async fetch_categories(store) {
      try {
        const response = await this.$axios.get("/categories/");
        console.log(response.data);
        store.commit("categories/SET_CATEGORIES", response.data, { root: true });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
