export default ({route, store}) => {
  const color = route.meta.reduce((uiColor, meta) => meta.uiColor || uiColor, 'black');
  store.commit('setUiColor', color);
};
