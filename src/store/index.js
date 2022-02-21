import { createStore } from "vuex";

export default createStore({
  state: {
    filesData: [],
    fileter: "",
  },
  actions: {
    // async handelInit({ commit }) {
    //   try {
    //     const res = await getAllFiles();
    //     commit("init", res.data.data);
    //     console.log(res.data.data);
    //     return res.data.data;
    //   } catch (error) {
    //     console.error(error.response);
    //   }
    // },
    // handelfilter({ commit }, index) {
    //   // console.log(index);
    //   commit("filter", index);
    // },
  },
  mutations: {
    init(state, data) {
      state.filesData = data;
    },
    filter(state, index) {
      state.fileter = index;
    },
  },
  getters: {
    filesData(state) {
      return state.filesData;
    },
    fileter(state) {
      return state.fileter;
    },
  },
});
