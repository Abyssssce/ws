import OverlapDetect from 'assets/helpers/overlapDetect';

export default {
  name: 'overlap-element',

  components: {},

  props: {
    selectors: {
      type: Array,
      default: () => []
    },
    wrapper: {
      type: String,
      default: '.page__body'
    }
  },

  data() {
    return {
      overlapDetect: null,
      isDark: false
    };
  },

  computed: {},

  watch: {
    '$route.path': {
      handler: function () {
        this.$nextTick(() => {
          this.update();
        });
      },
      immediate: true
    }
  },

  created() {
    this.$root.$on('updateOverlap', () => {
      this.update();
    });
  },

  mounted() {
    this.overlapDetect = new OverlapDetect({
      target: this.$el,
      wrapper: this.wrapper
        ? document.querySelector(this.wrapper)
        : null,
      selectors: [...this.selectors, '[data-dark]'],
      onEnter: () => {
        this.$emit('onEnter');
        this.isDark = true;
      },
      onLeave: () => {
        this.$emit('onLeave');
        this.isDark = false;
      }
    });

    this.overlapDetect.run();
    this.overlapDetect.update();
  },

  methods: {
    update() {
      if (this.overlapDetect) {
        this.overlapDetect.update();
      }
    }
  },

  beforeDestroy() {
    if (this.overlapDetect) {
      this.overlapDetect.destroy();
    }

    this.$root.$off('updateOverlap');
  }
};
