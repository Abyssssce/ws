import {mapGetters, mapMutations} from 'vuex';

import anoncedDate from '~/components/paths/anonced-date.vue';
import casesList from '~/components/cases-list/cases-list.vue';
import headShieldResistence from '~/components/paths/head-shield-resistence.vue';
import headProd from '~/components/paths/head-prod.vue';
import footerComponent from '~/components/footer/footer.vue';
import shieldCasePart1 from '~/components/paths/shield-case-part1.vue';
import shieldCasePart2 from '~/components/paths/shield-case-part2.vue';
import shieldCasePart3 from '~/components/paths/shield-case-part3.vue';
import shieldMobileText from '~/components/paths/shield-mobile-text.vue';
import soundButton from '~/components/sound-button/sound-button.vue';
import subscribe from '~/components/subscribe/subscribe.vue';

export default {
  name: 'shield',

  components: {
    anoncedDate,
    casesList,
    headShieldResistence,
    headProd,
    footerComponent,
    shieldCasePart1,
    shieldCasePart2,
    shieldCasePart3,
    shieldMobileText,
    soundButton,
    subscribe
  },

  data() {
    return {
      cases: [
        {
          text: 'Intro duce @_squad abigail feat. unknow .id edit shield 2.0 - custom second skin',
          component: shieldCasePart2,
          covers: [
            // require('assets/images/cover-shield.jpg')
          ],
          link: '',
          width: 13
        }
      ]
    };
  },

  computed: {
    ...mapGetters([
      'getScrollBarWidth',
      'isMobile'
    ])
  },

  watch: {},

  created() {
    let images = [];

    this.cases.forEach(item => {
      images = images.concat(item.covers.map(image => {
        return {
          type: 'three',
          url: image
        };
      }));
    });

    this.$nextTick(() => {
      if (!this.isMobile) {
        this.setLoaderResources(images);
      }
    });
  },

  mounted() {},

  methods: {
    ...mapMutations([
      'setLoaderResources'
    ]),

    onSubscribeClick() {
      if (this.isMobile) {
        const scrollElement = document.querySelector('.page__wrapper');
        const hashElement = this.$refs.subscribe.$el;
        const scrollTop = hashElement.getBoundingClientRect().top + scrollElement.scrollTop;

        TweenLite.to(scrollElement, .5, {scrollTo: scrollTop});
      }
    }
  },

  beforeDestroy() {}
};
