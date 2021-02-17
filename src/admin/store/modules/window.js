export default {
  namespaced: true,
  state: {
    windowWidth: window.innerWidth,
  },
  mutations: {
    SET_WIDTH: (state, width) => (state.windowWidth = width),
  },
  actions: {
    set_width(store) {
      store.commit("window/SET_WIDTH", window.innerWidth, { root: true });
    },
  },
};
