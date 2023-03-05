import {mapState, mapGetters, mapMutations} from 'vuex';
import {TimelineMax, CSSPlugin, TweenMax, EasePack} from 'gsap'; // eslint-disable-line

import cookiePopup from '~/components/cookie-popup/cookie-popup.vue';
import customCursor from '~/components/custom-cursor/custom-cursor.vue';
import preloader from '~/components/preloader/preloader.vue';
import screensaver from '~/components/screensaver/screensaver.vue';
import theBackground from '~/components/the-background';
import turnScreen from '~/components/turn-screen/turn-screen.vue';

import throttle from 'assets/helpers/throttle';
import Sound from 'assets/helpers/sound';
import {fadeIn, fadeOut} from 'assets/helpers/animations.js';

import {getCookie, setCookie} from 'assets/helpers/cookies.js';

const scrollBarHelper = process.browser
  ? require('assets/helpers/scrollBarHelper.js')
  : null;

const fontSizeHelper = process.browser
  ? require('assets/helpers/fontSizeHelper')
  : null;

const SwipeDetect = process.browser
  ? require('assets/helpers/swipeDetect').default
  : null;

export default {
  components: {
    cookiePopup,
    customCursor,
    preloader,
    screensaver,
    theBackground,
    turnScreen
  },

  data() {
    return {
      sound: null,

      fadeIn: fadeIn,
      fadeOut: fadeOut,

      onKeyDown: null,

      menuIsOpen: false
    };
  },

  // head() {
  //   return {
  //     title: this.commonData.meta.title,
  //     meta: [
  //       {hid: 'ogtitle', property: 'og:title', content: this.commonData.meta.title},
  //       {hid: 'description', name: 'description', content: this.commonData.meta.description},
  //       {hid: 'ogdescription', property: 'og:description', content: this.commonData.meta.description},
  //       {hid: 'ogimage', property: 'og:image', content: this.commonData.meta.og_image}
  //     ]
  //   };
  // },

  computed: {
    ...mapState([
      'app',
      'commonData',
      'mobileButtonActivity',
      'muted',
      'sounds'
    ]),

    ...mapGetters([
      'isMobile',
      'isDesktop'
    ])
  },

  watch: {
    isMobile() {
      if (!this.isMobile) {
        this.menuIsOpen = false;
      }
    },

    '$route.name'() {
      this.menuIsOpen = false;
    },

    muted: {
      handler: function (val) {
        setCookie('muted', val);

        if (val) {
          this.sound.pause();
        } else {
          this.sound.play();
        }
      }
    }
  },

  created: function () {
    if (process.browser) {
      this.bindEvents();

      switch (document.readyState) {
        case 'loading':
          document.addEventListener('DOMContentLoaded', () => {
            this.setAppReady(true);
          });

          window.onload = () => {
            this.setAppLoad(true);
          };
          break;

        case 'interactive':
          this.setAppReady(true);

          window.onload = () => {
            this.setAppLoad(true);
          };
          break;

        case 'complete':
          this.setAppReady(true);
          this.setAppLoad(true);
          break;
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.sound = new Sound({
        value: this.sounds.globalSound
      });

      const vm = this;

      window.onblur = function () {
        vm.sound.sound.volume = 0;
      };

      this.setMuted(getCookie('muted') === 'true');

      if (!this.muted) {
        this.sound.play();
      }

      this.$el.addEventListener('click', () => {
        if (this.sound?.isPaused() && !this.muted) {
          this.sound.play();
        }
      });

      window.onfocus = function () {
        if (!vm.muted) {
          vm.sound.play();
        }
      };
    });

    this.setIsMobilePlatform();
    this.setLayoutType();
    this.setFontSize(fontSizeHelper.update(this.app.currentLayout));
    this.saveSizes();

    const onWindowResize = throttle(() => {
      this.setLayoutType();
      this.setFontSize(fontSizeHelper.update(this.app.currentLayout));

      setTimeout(() => {
        this.saveSizes();

        if (this.app.isMobilePlatform) {
          document.querySelector('body').style.minHeight = `${this.app.sizes?.viewport.height}px`;
        }
      }, 500);
    }, 100);

    window.addEventListener('resize', onWindowResize);

    window.addEventListener('keydown', this.onKeyDown);

    if (SwipeDetect) {
      const swipeDetect = new SwipeDetect({
        element: this.$el
      }, e => {
        switch (e) {
          case 'up':
            this.$root.$emit('onNavigateDown');
            break;
          case 'down':
            this.$root.$emit('onNavigateUp');
            break;
        }
      });
      swipeDetect.run();
    }
  },

  methods: {
    ...mapMutations([
      'setAppReady',
      'setAppLoad',
      'setCurrentLayout',
      'setFontSize',
      'setSizes',
      'setFocus',
      'setBlur',
      'setIsMobilePlatform',
      'setMuted'
    ]),

    saveSizes() {
      const sizes = {
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        scrollbar: {
          width: scrollBarHelper.getScrollBarWidth()
        }
      };

      this.setSizes(sizes);
    },

    menuBtnClick() {
      if (this.mobileButtonActivity) {
        if (this.$route.name === 'index-cases-id') {
          this.$router.push({name: 'index'});
        } else if (this.menuIsOpen) {
          this.menuIsOpen = false;
        } else {
          this.menuIsOpen = true;
        }
      }
    },

    setLayoutType() {
      const mqMobile = window.matchMedia('only screen and (max-width: 767px)');
      const mqTablet = window.matchMedia('only screen and (max-width: 960px)');

      if (mqMobile.matches) {
        this.setCurrentLayout('mobile');
      } else if (mqTablet.matches) {
        this.setCurrentLayout('tablet');
      } else {
        this.setCurrentLayout('desktop');
      }
    },

    checkInteractiveNode(node) {
      const deep = 3;
      let step = 0;

      const checkNode = n => {
        if (n.nodeName === 'BUTTON' || n.nodeName === 'A' || n.nodeName === 'a' || n.nodeName === 'LABEL') {
          return true;
        }
        if (step < deep) {
          step++;
          return n.parentNode
            ? checkNode(n.parentNode)
            : null;
        }

        return null;
      };

      return checkNode(node);
    },

    bindEvents() {
      let currentNode = null;

      const onMouseOver = throttle(e => {
        currentNode = this.checkInteractiveNode(e.target);

        this.setFocus(currentNode);
      }, 100);

      window.addEventListener('blur', this.setBlur);
      window.addEventListener('mouseover', onMouseOver);
    },

    hookEnter(el, done) {
      el.style.opacity = 0;

      const tl = new TimelineLite({onComplete: done});

      tl.set(el, {opacity: 0, transition: 'none'})
        .to(el, .3, {opacity: 1, clearProps: 'opacity, transition'});
    },

    hookLeave(el, done) {
      const tl = new TimelineLite({onComplete: () => {
        this.$refs.wrapper.scrollTop = 0;
        done();
      }});

      tl.set(el, {opacity: 1, transition: 'none'})
        .to(el, .3, {opacity: 0});
    }
  }
};
