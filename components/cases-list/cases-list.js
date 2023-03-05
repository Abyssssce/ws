import {mapState, mapGetters} from 'vuex';
import {fadeIn, fadeOut} from '../../assets/helpers/animations';

import imageDistortion from '~/components/image-distortion/image-distortion.vue';

import {getRandomElement} from 'assets/helpers/randomHelper';
import throttle from 'assets/helpers/throttle';

export default {
  name: 'cases-list',

  components: {
    imageDistortion
  },

  props: {
    cases: {
      type: Array
    },
    side: {
      type: String,
      default: 'left'
    }
  },

  data: function () {
    return {
      fadeIn: fadeIn,
      fadeOut: fadeOut,

      image: null,
      currentCovers: null,
      imageVisibility: false,
      imageKey: 'key',

      updateImagePosition: null,
      savedMouseMoveEvent: null,

      distance: 0
    };
  },

  computed: {
    ...mapState([
      'app'
    ]),

    ...mapGetters([
      'isMobile'
    ]),

    images() {
      let images = [];

      this.cases.forEach(item => {
        images = images.concat(item.covers);
      });

      return images;
    }
  },

  watch: {
    distance() {
      if (this.distance > 350 && this.currentCovers) {
        this.image = getRandomElement(this.currentCovers, this.image);
        this.distance = 0;
      }
    }
  },

  created() {
    this.updateImagePosition = throttle(() => {
      if (this.savedMouseMoveEvent) {
        const rect = this.$el.getBoundingClientRect();

        this.$nextTick(() => {
          const x = this.savedMouseMoveEvent.clientX - rect.left;
          const y = this.savedMouseMoveEvent.clientY - rect.top;

          const tl = new TimelineLite();
          tl.to([this.$refs.imageWrapper, this.$refs.imageWrapper2], .3, {x: x, y: y});
        });
      }
    }, 30);
  },

  mounted() {
    window.addEventListener('mousemove', this.onMouseMove);

    this.$root.$on('scroll', () => {
      this.updateImagePosition();
    });
  },

  methods: {
    onMouseMove(event) {
      if (event) {
        if (this.savedMouseMoveEvent) {
          const xValue = Math.abs(this.savedMouseMoveEvent.clientX - event.clientX);
          const yValue = Math.abs(this.savedMouseMoveEvent.clientY - event.clientY);

          this.distance += Math.sqrt(Math.pow(xValue, 2) + Math.pow(yValue, 2));
        }

        this.savedMouseMoveEvent = event;

        this.updateImagePosition();
      }
    },

    getTag(item) {
      if (item.detail && !this.isMobile && this.innerCasesEnabled) {
        return 'router-link';
      }

      if (item.link) {
        return 'A';
      }

      return 'DIV';
    },

    getTo(item) {
      if (item.detail && !this.isMobile && this.innerCasesEnabled) {
        return this.localePath({name: 'done-id', params: {id: item.id}});
      }

      return null;
    },

    visibilityChanged(isVisible, entry) {
      if (isVisible) {
        entry.target.classList.add('viewport-element_visible');
      } else {
        entry.target.classList.remove('viewport-element_visible');
      }
    },

    hookImageWrapperEnter(el, done) {
      const tl = new TimelineMax({
        onComplete: done
      });

      tl.from(el, .3, {scale: .95});
    },

    hookImageWrapperLeave(el, done) {
      const tl = new TimelineMax({
        onComplete: done
      });

      tl.to(el, .3, {
        scale: .95,
        opacity: 0,
        clearProps: 'x, scale, opacity'
      });
    },

    hookImageEnter(el, done) {
      const tl = new TimelineMax({
        onComplete: done
      });

      tl.set(el, {opacity: 0})
        .to(el, .1, {opacity: 1});
    },

    hookImageLeave(el, done) {
      const tl = new TimelineMax({
        onComplete: done
      });

      tl.to(el, .1, {opacity: 0, clearProps: 'opacity'});
    },

    onMouseEnter(covers) {
      this.currentCovers = covers;
      this.image = getRandomElement(covers, this.image);
      this.imageVisibility = true;

      this.imageKey = `${this.image}${this.savedMouseMoveEvent?.clientX}${this.savedMouseMoveEvent?.clientY}`;
    },

    onMouseLeave() {
      this.currentCovers = null;
      this.imageVisibility = false;

      setTimeout(() => {
        if (!this.imageVisibility) {
          this.image = null;
        }
      }, 400);
    }
  },

  beforeDestroy() {
    this.$root.$off('scroll');
    window.removeEventListener('mousemove', this.onMouseMove);
  }
};
