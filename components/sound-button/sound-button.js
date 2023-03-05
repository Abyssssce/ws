import {mapState, mapGetters, mapMutations} from 'vuex';
import anime from 'animejs/lib/anime.es.js';

import svgGradient from '~/components/svg-gradient/svg-gradient.vue';

export default {
  name: 'sound-button',

  components: {
    svgGradient
  },

  data() {
    return {
      tweens: null
    };
  },

  computed: {
    ...mapState([
      'muted'
    ]),

    ...mapGetters([
      'isMobile'
    ])
  },

  watch: {
    muted: {
      handler: function (val) {
        if (val) {
          this.stop();
        } else {
          this.play();
        }
      }
    }
  },

  created() {},

  mounted() {
    this.tweens = [
      anime({
        autoplay: false,
        targets: this.$refs.lineLeft,
        points: [
          {value: [
            '6 49 0 49 0 43 15 28 21 28 21 34',
            '6 49 0 49 0 43 43 0 49 0 49 6'
          ]},
          {value: '34 21 28 21 28 15 43 0 49 0 49 6'},
          {value: '6 49 0 49 0 43 43 0 49 0 49 6'},
          {value: '6 49 0 49 0 43 15 28 21 28 21 34'}
        ],
        duration: 3500,
        easing: 'linear',
        direction: 'alternate',
        loop: true
      }),
      anime({
        autoplay: false,
        targets: this.$refs.lineCenter,
        points: [
          {value: [
            '6 70 0 70 0 64 64 0 70 0 70 6',
            '6 70 0 70 0 64 15 49 21 49 21 55'
          ]},
          {value: '6 70 0 70 0 64 64 0 70 0 70 6'},
          {value: '55 21 49 21 49 15 64 0 70 0 70 6'},
          {value: '6 70 0 70 0 64 64 0 70 0 70 6'}
        ],
        duration: 3300,
        easing: 'linear',
        loop: true
      }),
      anime({
        autoplay: false,
        targets: this.$refs.lineRight,
        points: [
          {value: [
            '55 42 49 42 49 36 64 21 70 21 70 27',
            '27 70 21 70 21 64 64 21 70 21 70 27'
          ]},
          {value: '27 70 21 70 21 64 36 49 42 49 42 55'},
          {value: '27 70 21 70 21 64 64 21 70 21 70 27'},
          {value: '55 42 49 42 49 36 64 21 70 21 70 27'}
        ],
        duration: 3700,
        easing: 'linear',
        direction: 'alternate',
        loop: true
      })
    ];

    if (!this.muted) {
      this.play();
    }
  },

  methods: {
    ...mapMutations([
      'setMuted'
    ]),

    play() {
      this.tweens.forEach(tween => {
        tween.play();
      });

      anime.timeline({
        duration: 300,
        easing: 'linear'
      })
        .add({
          targets: this.$refs.lineLeft,
          opacity: 1
        })
        .add({
          targets: this.$refs.lineRight,
          opacity: 1
        }, '-=300')
        .add({
          targets: this.$refs.lineCross,
          opacity: 0
        }, '-=300');
    },

    stop() {
      anime({
        targets: this.$refs.lineCenter,
        points: [
          {value: '6 70 0 70 0 64 64 0 70 0 70 6'}
        ],
        duration: 300,
        easing: 'linear'
      });

      anime.timeline({
        duration: 300,
        easing: 'linear'
      })
        .add({
          targets: this.$refs.lineLeft,
          opacity: 0
        })
        .add({
          targets: this.$refs.lineRight,
          opacity: 0
        }, '-=300')
        .add({
          targets: this.$refs.lineCross,
          opacity: 1,
          complete: () => {
            this.tweens.forEach(tween => {
              // tween.restart();
              tween.pause();
            });
          }
        }, '-=300');
    },

    toggleSound() {
      this.setMuted(!this.muted);
    }
  },

  beforeDestroy() {}
};
