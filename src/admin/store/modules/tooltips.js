export default {
  namespaced: true,
  state: {
    isShown: false,
    text: "",
    type: "success",
  },
  mutations: {
    SET_TOOLTIP: (state, tooltip) => {
      state.isShown = tooltip.isShown;
      state.text = tooltip.text;
      state.type = tooltip.type;
    },
  },
  actions: {
    show_tooltip(store, tooltip) {
      let timeout = null;
      store.commit("SET_TOOLTIP", {
        isShown: true,
        text: tooltip.text,
        type: tooltip.type,
      });

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        store.dispatch("hide_tooltip");
      }, 2000);
    },
    hide_tooltip(store) {
      store.commit("SET_TOOLTIP", {
        ...store.state,
        isShown: false,
      });
    },
  },
};
