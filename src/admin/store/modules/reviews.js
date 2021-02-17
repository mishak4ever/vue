export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_REVIEW(state, newReview) {
      state.data.push(newReview);
    },
    SET_REVIEWS(state, reviews) {
      state.data = reviews;
    },
    EDIT_REVIEW(state, editReview) {
      state.data = state.data.map((review) => {
        return review.id === editReview.id ? editReview : review;
      });
    },
    DELETE_REVIEW(state, deleteReview) {
      state.data = state.data.filter((review) => review.id !== deleteReview.id);
    },
  },
  actions: {
    async add(store, newReview) {
      const formData = new FormData();

      for (let prop in newReview) {
        if (prop == "preview") continue;
        formData.append(prop, newReview[prop]);
      }

      try {
        const response = await this.$axios.post("/reviews", formData);
        store.commit("reviews/ADD_REVIEW", response.data, { root: true });
        return response.data;
      } catch (error) {
        let text = [];
        if (error.response.data.errors) {
          Object.keys(error.response.data.errors).forEach((item) => {
            text.push(error.response.data.errors[item]);
          });
        } else text = error.message;
        throw new Error("Ошибка добавления отзыва: " + text);
      }
    },
    async delete(store, review) {
      try {
        const response = await this.$axios.delete(`/reviews/${review.id}`);
        store.commit("reviews/DELETE_REVIEW", review, { root: true });
        return response.data;
      } catch (error) {
        let text = [];
        if (error.response.data.errors) {
          Object.keys(error.response.data.errors).forEach((item) => {
            text.push(error.response.data.errors[item]);
          });
        } else text = error.message;
        throw new Error("Ошибка удаления отзыва: " + text);
      }
    },
    async edit(store, newReview) {
      const formData = new FormData();

      for (let prop in newReview) {
        if (prop == "preview") continue;
        formData.append(prop, newReview[prop]);
      }

      try {
        const response = await this.$axios.post(
          `/reviews/${newReview.id}`,
          formData
        );
        store.commit("reviews/EDIT_REVIEW", response.data, { root: true });
        return response.data;
      } catch (error) {
        let text = [];
        if (error.response.data.errors) {
          Object.keys(error.response.data.errors).forEach((item) => {
            text.push(error.response.data.errors[item]);
          });
        } else text = error.message;
        throw new Error("Ошибка изменения отзыва: " + text);
      }
    },

    async fetch(store, user) {
      try {
        const response = await this.$axios.get("/reviews/" + user);
        store.commit("reviews/SET_REVIEWS", response.data, { root: true });
      } catch (error) {
        console.log("error", error.message);
        throw new Error("Произошла ошибка Загрузки: " + error.message);
      }
    },
  },
};
