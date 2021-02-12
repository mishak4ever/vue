export default {
  namespaced: true,
  state: {
    user: {},
    token: "",
  },
  mutations: {
    SET_USER: (state, userId) => (state.user = userId),
    SET_TOKEN: (state, token) => (state.token = token),
  },
  actions: {
    dumm(store) {
      console.log("dumm");
    },
    async get_user(store) {
      try {
        const response = await this.$axios.get("/user");
        store.commit("user/SET_USER", response.data, { root: true });
        return response.data.user;
      } catch (error) {
        throw new Error("ошибка чтения юзера");
      }
    },
    async login(store, user) {
      try {
        const response = await this.$axios.post("/login", user);
        this.$axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        store.commit("user/SET_TOKEN", response.data.token, { root: true });
        localStorage.setItem("token", response.data.token);
        return response.data.token;
      } catch (error) {
        switch (error.message) {
          case "Request failed with status code 403":
            throw new Error("Неверный логин или пароль");
            break;
          default:
            throw new Error("login:" + error.message);
            break;
        }
      }
    },
    async refresh_token(store) {
      try {
        // console.log("refresh token");
        const response = await this.$axios.post("/refreshToken");
        this.$axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        store.commit("user/SET_TOKEN", response.data.token, { root: true });
        localStorage.setItem("token", response.data.token);
        return response.data.token;
      } catch (error) {
        // console.log(error.message);
        throw new Error("ошибка обновления токена");
      }
    },
  },
};
