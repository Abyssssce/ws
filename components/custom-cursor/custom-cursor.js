import {mapState, mapMutations} from 'vuex';

import icon from '~/components/icon/icon.vue';

import {fadeIn, fadeOut, scaleIn, scaleOut} from 'assets/helpers/animations';
import {isDark} from 'assets/helpers/colorHelper';

export default {
  name: 'custom-cursor',

  components: {
    icon
  },

  props: {
    cursorEnabled: {
      type: Boolean,
      default: true
    },
    to: {
      type: Object
    },
    size: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data() {
    return {
      cursorVisibility: false,
      cursorStyles: null,
      onMouseMove: null,

      mouseIsDown: false,

      fadeIn: fadeIn,
      fadeOut: fadeOut,
      scaleIn: scaleIn,
      scaleOut: scaleOut
    };
  },

  computed: {
    ...mapState([
      'app'
    ]),

    fontSize() {
      return Math.round(this.app.fontSize / 2) * 2;
    },

    uiColor() {
      return isDark(this.color) ? 'white' : 'black';
    },

    isHovered() {
      return !!this.app.interactiveHoverNode || this.app.cursor === 'grabbing';
    }
  },

  watch: {},

  created() {
    this.onMouseMove = event => {
      if (event) {
        const rect = this.$el.getBoundingClientRect();

        const clientX = event.clientX || (event.touches ? event.touches[0].clientX : 0);
        const clientY = event.clientY || (event.touches ? event.touches[0].clientY : 0);

        const localX = clientX - rect.left;
        const localY = clientY - rect.top;

        this.setCursorCoordinates({
          x: localX,
          y: localY
        });

        if (localX > 0 && localX < rect.width && localY > 0 && localY < rect.height) {
          this.cursorVisibility = true;

          // this.cursorStyles = {
          //   transform: `translateX(${localX}px) translateY(${localY}px) translateZ(0)`,
          //   fontSize: `${this.fontSize}px`
          // };

          if (this.$refs.cursorWrapper) {
            this.$refs.cursorWrapper.style.transform = `translateX(${localX}px) translateY(${localY}px) translateZ(0)`;

            // const tl = new TimelineLite();
            // tl.to(this.$refs.cursorWrapper, .05, {x: localX, y: localY});
          }
        } else {
          this.cursorVisibility = false;
        }
      }
    };
  },

  mounted() {},

  methods: {
    ...mapMutations([
      'setCursorCoordinates'
    ]),

    onMouseDown() {
      this.mouseIsDown = true;
    },

    onMouseUp() {
      this.mouseIsDown = false;
    }
  },

  beforeDestroy() {
    const el = this.$refs.cursor;
    if (el) {
      scaleOut(el);
    }
  }
};
