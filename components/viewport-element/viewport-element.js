export default {
  name: 'viewport-element',

  components: {},

  data() {
    return {};
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    visibilityChanged(isVisible, entry) {
      if (isVisible) {
        entry.target.classList.add('viewport-element_visible');
      } else {
        entry.target.classList.remove('viewport-element_visible');
      }
    }
  },

  beforeDestroy() {}
};
