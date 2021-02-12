export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_WORK(state, newWork) {
      state.data.push(newWork);
    },
    SET_WORKS(state, works) {
      state.data = works;
    },
    EDIT_WORK(state, editWork) {
      state.data = state.data.map((work) => {
        return work.id === editWork.id ? editWork : work;
      });
    },
  },
  actions: {
    async add(store, newWork) {
      const formData = new FormData();

      for (let prop in newWork) {
        if (prop == "preview") continue;
        formData.append(prop, newWork[prop]);
      }

      try {
        const response = await this.$axios.post("/works", formData);
        store.commit("works/ADD_WORK", response.data, { root: true });
      } catch (error) {
        const text = error.response.data.errors
          ? JSON.stringify(error.response.data.errors)
          : error.message;
        console.log("error", text);
        throw new Error("Ошибка добавления работы: " + text);
      }
    },
    async edit(store, newWork) {
      const formData = new FormData();

      for (let prop in newWork) {
        if (prop == "preview") continue;
        formData.append(prop, newWork[prop]);
      }

      try {
        const response = await this.$axios.post(
          `/works/${newWork.id}`,
          formData
        );
        store.commit("works/EDIT_WORK", response.data, { root: true });
      } catch (error) {
        const text = error.response.data.errors
          ? JSON.stringify(error.response.data.errors)
          : error.message;
        console.log("error", text);
        throw new Error("Ошибка изменения работы: " + text);
      }
    },

    async fetch(store, user) {
      try {
        const response = await this.$axios.get("/works/" + user);
        store.commit("works/SET_WORKS", response.data, { root: true });
      } catch (error) {
        console.log("error", error.message);
        throw new Error("Произошла ошибка Загрузки: " + error.message);
      }
    },
  },
};
