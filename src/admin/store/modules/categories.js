export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
  },
  action: {
    async create(store, title) {
      try {
        const response = await this.$axios.post("/categories", { title });
        store.commit("ADD_CATEGORY", response.data);
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async fetch(store) {
      try {
        const response = await this.$axios.get("/categories/");
        console.log(response.data);
        store.commit("SET_CATEGORIES", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
