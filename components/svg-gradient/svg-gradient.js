import {mapState} from 'vuex';
import {TweenMax as Tween} from 'gsap';

// import throttle from 'assets/helpers/throttle';

export default {
  name: 'svg-gradient',

  components: {},

  props: {
    id: {
      type: String
    }
  },

  data() {
    return {
      rect: null,
      scale: 1,
      diagPositionPercentResult: .5,
      deviceOrientation: null
    };
  },

  computed: {
    ...mapState([
      'app',
      'gradientCoordinates'
    ]),

    width() {
      return this.app.sizes?.viewport?.width || 1;
    },

    height() {
      return this.app.sizes?.viewport?.height || 1;
    },

    cursorX() {
      return (this.app.cursorCoordinates?.x || this.width / 2);
    },

    cursorY() {
      return (this.app.cursorCoordinates?.y || this.height / 2);
    },

    diagSize() {
      return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
    },

    diagPosition() {
      return Math.sqrt(Math.pow(this.cursorX, 2) + Math.pow(this.cursorY, 2));
    },

    diagPositionPercent() {
      return this.deviceOrientation
        ? Math.sqrt(Math.pow(this.deviceOrientation.x, 2) + Math.pow(this.deviceOrientation.y, 2))
        : 100 / 100 / this.diagSize * this.diagPosition;
    },

    x1() {
      return (-this.rect?.left || 1) * this.scale;
    },

    y1() {
      return (-this.rect?.top || 1) * this.scale;
    },

    x2() {
      return this.x1 + this.width * this.scale;
    },

    y2() {
      return this.y1 + this.height * this.scale;
    }
  },

  watch: {
    diagPositionPercent: {
      handler: function (val) {
        Tween.to(this, 4, {

          diagPositionPercentResult: val,
          ease: 'Power4.easeOut'
        });
      }
    }
  },

  created() {},

  mounted() {
    this.updateSizes();

    // this.$root.$off('scroll');

    this.$root.$on('scroll', () => {
      this.updateSizes();
    });

    window.addEventListener('resize', this.updateSizes);
  },

  methods: {
    updateSizes() {
      this.$nextTick(() => {
        const svgNode = this.$parent.$el.viewBox
          ? this.$parent.$el
          : this.$parent.$el.querySelector('svg');

        this.rect = this.$parent.$el.getBoundingClientRect();
        this.scale = svgNode.viewBox.baseVal.width / (this.rect.width || 1);
      });
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateSizes);
  }
};
