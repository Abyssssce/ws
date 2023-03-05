import {mapGetters} from 'vuex';

import footerIcon from '~/components/paths/footer.vue';

export default {
  name: 'footer-component',

  components: {
    footerIcon
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {},

  beforeDestroy() {}
};
