export default {
  namespaced: true,
  state: {
    user: { id: 1, name: "" },
  },
  mutations: {
    SET_USER: (state, user) => (state.user = user),
  },
  actions: {
    async get_user(store) {
      try {
        const response = await this.$axios.get("/user");
        store.commit("user/SET_USER", response.data, { root: true });
        console.log(response.data.user);
        return response.data.user;
      } catch (error) {
        console.log(error);
        throw new Error("ошибка чтения юзера");
      }
    },
  },
};
