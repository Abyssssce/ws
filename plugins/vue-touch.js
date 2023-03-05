import Vue from 'vue';

if (process.browser) {
  const VueTouch = require('vue-touch');
  Vue.use(VueTouch, {name: 'vtouch'});
}
