import {mapState, mapGetters, mapMutations} from 'vuex';

import casesList from '~/components/cases-list/cases-list.vue';
import case1 from '~/components/paths/case1.vue';
import case2 from '~/components/paths/case2.vue';
import case3 from '~/components/paths/case3.vue';
import case4 from '~/components/paths/case4.vue';
import case5 from '~/components/paths/case5.vue';
import case6 from '~/components/paths/case6.vue';
import case7 from '~/components/paths/case7.vue';
import contacts from '~/components/paths/contacts.vue';
import footerComponent from '~/components/footer/footer.vue';
import head1 from '~/components/paths/head1.vue';
import headShield from '~/components/paths/head-shield.vue';
import homeAbout from '~/components/paths/home-about.vue';
import prodMobileText from '~/components/paths/prod-mobile-text.vue';
import soundButton from '~/components/sound-button/sound-button.vue';

const platformDetect = process.browser
  ? require('assets/helpers/platformDetect.js')
  : null;

export default {
  name: 'index-root',

  components: {
    casesList,
    contacts,
    footerComponent,
    head1,
    headShield,
    homeAbout,
    prodMobileText,
    soundButton
  },

  data() {
    return {};
  },

  computed: {
    ...mapState([
      'app'
    ]),

    isSafari() {
      return platformDetect?.detectBrowser.isSafari;
    },

    cases() {
      return [
        {
          text: 'Client: Union District 12\n' +
            'Description: anonymous access\n' +
            'Create: Web design, Identity',
          component: case1,
          covers: [
            require('assets/images/case1cover1.jpg')
          ],
          link: '',
          width: 12
        },
        {
          text: 'Client: OFFF Festival\n' +
            'Description: OFFF Moscow 2019\n' +
            'Create: Web design, Identity, Media campaign, Digital campaign.',
          component: case2,
          covers: [
            require('assets/images/case2cover1.jpg'),
            require('assets/images/case2cover2.jpg'),
            this.isSafari
              ? require('assets/images/2020.jpg')
              : {
                image: require('assets/images/2020.jpg'),
                mp4: require('assets/images/2020.mp4'),
                ogv: require('assets/images/2020.ogv'),
                webm: require('assets/images/2020.webm')
              }
          ],
          link: '',
          width: 13
        },
        {
          text: 'Client: Core\n' +
            'Description: Digital agency\n' +
            'Create: Web design, Showreel',
          component: case3,
          covers: [
            require('assets/images/case3cover2.jpg'),
            this.isSafari
              ? require('assets/images/teaser_sc3.jpg')
              : {
                image: require('assets/images/teaser_sc3.jpg'),
                mp4: require('assets/images/teaser_sc3.mp4'),
                ogv: require('assets/images/teaser_sc3.ogv'),
                webm: require('assets/images/teaser_sc3.webm')
              },
            this.isSafari
              ? require('assets/images/teaser_shorter.jpg')
              : {
                image: require('assets/images/teaser_shorter.jpg'),
                mp4: require('assets/images/teaser_shorter.mp4'),
                ogv: require('assets/images/teaser_shorter.ogv'),
                webm: require('assets/images/teaser_shorter.webm')
              }
          ],
          link: '',
          width: 13
        },
        {
          text: 'Client: Abyss. Side project\n' +
            'Description: Single “All for one”\n' +
            'Create: Single, Cover LP,  Packing',
          component: case4,
          covers: [
            require('assets/images/case4cover1.jpg'),
            require('assets/images/case4cover2.jpg'),
            require('assets/images/case4cover3.jpg')
          ],
          link: '',
          width: 13
        },
        {
          text: 'Client: Qualia Qua Beats\n' +
            'Description: Independent Music Label\n' +
            'Create: Web design, Identity, Social media, Digital campaign.',
          component: case5,
          covers: [
            require('assets/images/case5cover1.jpg'),
            require('assets/images/case5cover2.jpg')
          ],
          link: '',
          width: 13
        },
        {
          text: 'Client: Qualia Qua Beats\n' +
            'Description: Independent Music Label. Recollection\n' +
            'Create: Cover LP,  Packing',
          component: case6,
          covers: [
            require('assets/images/case6cover1.jpg'),
            require('assets/images/case6cover2.jpg'),
            require('assets/images/case6cover3.jpg')
          ],
          link: '',
          width: 12
        },
        {
          text: 'Client: Abyss. Side project\n' +
            'Description: Single “Shidoshi Moon”\n' +
            'Create: Single, Cover LP,  Packing',
          component: case7,
          covers: [
            require('assets/images/case7cover1.jpg')
          ],
          link: '',
          width: 12
        }
      ];
    },

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
    ])
  },

  beforeDestroy() {}
};
