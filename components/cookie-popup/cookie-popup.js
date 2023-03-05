import {mapState} from 'vuex';

import popup from '~/components/popup/popup.vue';

import {getCookie, setCookie} from 'assets/helpers/cookies';

export default {
  name: 'cookie-popup',

  components: {
    popup
  },

  data() {
    return {};
  },

  computed: {
    ...mapState([
      'commonData'
    ])
  },

  watch: {},

  created() {},

  mounted() {
    if (!getCookie('cookiesIsEnabled')) {
      setTimeout(() => {
        this.$refs.popup.open();
      }, 10000);
    }
  },

  methods: {
    onClosePopup() {
      setCookie('cookiesIsEnabled', true, {expires: 3600, path: '/'});
    },

    agreeClick() {
      setCookie('cookiesIsEnabled', true, {expires: 3600 * 24 * 100, path: '/'});
      this.$refs.popup.close();
    }
  },

  beforeDestroy() {}
};
