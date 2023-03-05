import {mapState, mapGetters} from 'vuex';

import accessError from '~/components/paths/access-error.vue';
import copyrightStamp from '~/components/copyright-stamp/copyright-stamp.vue';

export default {
  name: 'page-404',

  components: {
    accessError,
    copyrightStamp
  },

  data() {
    return {};
  },

  computed: {
    ...mapState([
      'app',
      'socials'
    ]),

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
