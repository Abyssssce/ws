export default {
  state: () => {
    return {
      resources: [],
      commonResources: [],
      videoTime: null,
      preload: false
    };
  },
  getters: {
    loaderIsVisible: state => {
      return state.resources.length;
    },
    getLoaderResources: state => {
      return [
        ...state.commonResources,
        ...state.resources
      ];
    }
  },
  mutations: {
    setLoaderCommonResources(state, payload = []) {
      state.commonResources = payload;
    },
    setLoaderResources(state, payload = []) {
      state.resources = payload;
    },
    setVideoTime(state, payload = null) {
      state.videoTime = payload;
    },
    setLoaderProgress(state, payload = true) {
      state.preload = payload;
    }
  }
};
