import app from './modules/app';
import loader from './modules/loader';

export const modules = {
  app,
  loader
};

export const state = () => ({
  commonData: null,
  muted: false,
  sounds: {
    globalSound: '/audio/1.mp3'
  }
});

export const mutations = {
  setCommonData(state, payload) {
    state.commonData = payload;
  },
  setMuted(state, payload = true) {
    state.muted = payload;
  }
};

export const actions = {
  async nuxtServerInit({dispatch}) { // eslint-disable-line
    // await dispatch('fetchCommonData');
  },
  async fetchCommonData({commit}) { // eslint-disable-line
    const {data} = await this.$axios.get('settings');

    commit('setCommonData', data);
  }
};
