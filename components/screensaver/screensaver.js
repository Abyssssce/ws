import {mapState, mapMutations} from 'vuex';

import screensaverText from '~/components/paths/screensaver-text.vue';

import {fadeIn, fadeOut} from 'assets/helpers/animations.js';
import throttle from 'assets/helpers/throttle.js';

export default {
  name: 'screensaver',

  components: {
    screensaverText
  },

  data() {
    return {
      isActive: false,
      fadeIn: fadeIn,
      fadeOut: fadeOut,
      ballInterval: null,
      raf: null,
      x: 0,
      y: 0,
      xStep: 1,
      yStep: 1,
      ballWidth: 29,
      ballHeight: 29
    };
  },

  computed: {
    ...mapState([
      'app'
    ]),

    height() {
      return this.app.sizes?.viewport.height;
    },

    width() {
      return this.app.sizes?.viewport.width;
    },

    ballStyles() {
      return {
        transform: `translateX(${this.x}px) translateY(${this.y}px) translateZ(0)`
      };
    }
  },

  watch: {
    isActive: {
      handler: function (val) {
        if (val) {
          this.$nextTick(() => {
            this.run();
          });
        } else {
          this.stopTimer();

          this.startTimer();
        }
      }
    }
  },

  created() {},

  mounted() {
    const onMouseMoveHandler = throttle(() => {
      this.isActive = false;
      this.stopTimer();

      this.startTimer();
    }, 1000);

    window.addEventListener('mousemove', onMouseMoveHandler);
    window.addEventListener('keydown', onMouseMoveHandler);
    window.addEventListener('click', onMouseMoveHandler);
    window.addEventListener('touchstart', onMouseMoveHandler);
  },

  methods: {
    ...mapMutations([
      'setCursorCoordinates'
    ]),

    startTimer() {
      this.sleepInterval = setTimeout(() => {
        this.isActive = true;
      }, 1000 * 60 * 2);
    },

    stopTimer() {
      clearTimeout(this.sleepInterval);
      this.sleepInterval = null;

      window.cancelAnimationFrame(this.raf);
      this.raf = null;
    },

    run() {
      this.x = this.width / 2;
      this.y = this.height / 2;

      this.raf = window.requestAnimationFrame(this.render);
    },

    render() {
      if (this.raf) {
        this.x += this.xStep;
        this.y += this.yStep;

        this.setCursorCoordinates({
          x: this.x,
          y: this.y
        });

        if (this.x >= this.width - this.ballWidth || this.x <= 0) {
          this.xStep *= -1;
        }

        if (this.y >= this.height - this.ballHeight || this.y <= 0) {
          this.yStep *= -1;
        }

        window.requestAnimationFrame(this.render);
      }
    }
  },

  beforeDestroy() {
    this.stopTimer();
  }
};
