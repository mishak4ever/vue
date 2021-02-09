export default {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    SET_USER: (state, userId) => (state.user = userId),
  },
  actions: {
    async get_user(store) {
      try {
        const response = await this.$axios.get("/user");
        store.commit("user/SET_USER", response.data, { root: true });
        return response.data.user;
      } catch (error) {
        throw new Error("ошибка чтения юзера");
      }
    },
  },
};
