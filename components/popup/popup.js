import {mapGetters} from 'vuex';

export default {
  name: 'popup',

  components: {},

  props: {
    id: {
      type: String,
      required: true
    },
    closeButton: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isOpen: false
    };
  },

  computed: {
    ...mapGetters([
      'getScrollBarWidth',
      'isMobile'
    ])
  },

  watch: {},

  created() {},

  mounted: function () {
    this.$root.$on('closePopup', id => {
      if (id === this.id) {
        this.close();
      }
    });

    this.$root.$on('openPopup', id => {
      if (id === this.id) {
        this.open();
      }
    });
  },

  methods: {
    close() {
      this.isOpen = false;
    },

    open() {
      this.isOpen = true;
    },

    onCloseClick() {
      this.$emit('onManualClose');
      this.close();
    },

    hookEnter(el, done) {
      this.hoverCloseIsEnabled = false;

      const panel = el.querySelector('.popup__panel');

      const tl = new TimelineLite({
        onComplete: () => {
          this.hoverCloseIsEnabled = true;
          done();
        }
      });
      tl.set(el, {opacity: 0})
        .set(panel, {y: '100%'})
        .to(el, .5, {opacity: 1})
        .to(panel, .5, {y: '0%', clearProps: 'all'}, '-=.3');
    },

    hookLeave(el, done) {
      const panel = el.querySelector('.popup__panel');

      const tl = new TimelineLite({
        onComplete: done
      });

      tl.set(el, {opacity: 1})
        .set(panel, {y: '0%'})
        .to(el, .5, {opacity: 0})
        .to(panel, .5, {y: '100%'}, '-=.3');
    }
  },

  beforeDestroy() {}
};
