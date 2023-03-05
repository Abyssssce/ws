import {mapState, mapGetters, mapMutations} from 'vuex';

import copyrightStamp from '~/components/copyright-stamp/copyright-stamp.vue';
import preloaderIcon from '~/components/paths/preloader.vue';

import {loadThreeImage} from 'assets/helpers/loadImage';

export default {
  name: 'preloader',

  components: {
    copyrightStamp,
    preloaderIcon
  },

  data() {
    return {
      progress: 0,

      loaderScreenVisibility: true,

      minLoadingTime: 3000,
      minLoadingTimeIsDone: false
    };
  },

  computed: {
    ...mapState([
      'commonData',
      'loader'
    ]),

    ...mapGetters([
      'getLoaderResources',
      'isMobile'
    ]),

    isLoading() {
      return this.loaderScreenVisibility || !this.minLoadingTimeIsDone;
    }
  },

  watch: {
    progress(value) {
      if (value >= 100) {
        this.$emit('loaded');

        this.loaderScreenVisibility = false;

        setTimeout(() => {
          this.progress = 0;
          // this.setLoaderProgress(false);
        }, 300);
      }
    },

    'loader.preload': {
      handler: function (val) {
        if (val) {
          const tl = new TimelineLite();

          tl.to(this, 5, {
            progress: 40,
            ease: Power1.easeInOut
          });
        }
      }
    },

    'loader.resources': {
      handler: function () {
        this.load();
      },
      immediate: true
    }
  },

  created() {},

  mounted() {
    setTimeout(() => {
      this.minLoadingTimeIsDone = true;
    }, this.minLoadingTime);
  },

  methods: {
    ...mapMutations([
      'setLoaderProgress'
    ]),

    async load() {
      if (this.getLoaderResources.length === 0) {
        const tl = new TimelineLite();

        tl.to(this, 1, {
          progress: 100,
          ease: Power1.easeInOut
        });
      } else {
        let loaded = 0;

        await Promise.all(this.getLoaderResources.map(async resource => {
          const timeStart = Date.now();

          switch (resource.type) {
            case 'three':
              if (typeof resource.url === 'string') {
                await loadThreeImage(resource.url);
              }
              break;

            default:
              try {
                const objImg = new Image();
                objImg.src = resource;

                if (!objImg.complete && !!resource) {
                  await this.$axios.get(resource, {
                    baseURL: '/',
                    responseType: 'arraybuffer'
                  });
                }

                // const timeEnd = Date.now() - timeStart;
                // console.log(`${resource}: ${timeEnd / 1000} sec`);
              } catch (e) {
                const timeEnd = Date.now() - timeStart;
                console.log(`[ERROR] ${resource}: ${timeEnd / 1000} sec`);
              }
          }

          loaded += 1;

          const tl = new TimelineLite();

          tl.to(this, 1, {
            progress: (loaded / this.getLoaderResources.length) * 100,
            ease: Power1.easeInOut
          });
        }));
      }
    },

    hookScreenEnter(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.from([this.$refs.icon.$el, this.$refs.stampIcon], .6, {opacity: 0});
    },

    hookScreenLeave(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.to([this.$refs.icon.$el, this.$refs.stampIcon], .6, {opacity: 0})
        .to(el, .6, {opacity: 0});
    }
  },

  beforeDestroy() {}
};
