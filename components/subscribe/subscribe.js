import {mapGetters} from 'vuex';
import jsonpAdapter from 'axios-jsonp';

import svgGradient from '~/components/svg-gradient/svg-gradient.vue';

import {fadeIn, fadeOut} from 'assets/helpers/animations.js';

export default {
  name: 'subscribe',

  components: {
    svgGradient
  },

  data() {
    return {
      fadeIn: fadeIn,
      fadeOut: fadeOut,
      formVisibility: false,
      form: {
        visibility: false,
        fields: {
          name: {
            name: 'name',
            value: ''
          },
          email: {
            name: 'email',
            value: ''
          }
        },
        requestBlocked: false,
        responseMessage: null
      }
    };
  },

  computed: {
    ...mapGetters([
      'isDesktop',
      'isMobile'
    ]),

    disableSubmit() {
      return this.formHasError ||
        this.form.requestBlocked ||
        this.someFieldIsInvalid;
    },

    someFieldIsInvalid() {
      return Object.keys(this.form.fields).some(item => {
        const inputContext = this.$refs[item] || this;
        const field = this.form.fields[item];
        return field.value === '' || inputContext.errors.has(field.name) || inputContext.hasError;
      });
    }
  },

  watch: {},

  created() {},

  mounted: function () {},

  methods: {
    clearForm() {
      this.form.fields.email.value = '';
      this.form.fields.name.value = '';
    },

    toggleFormVisibility() {
      this.form.responseMessage = null;
      this.formVisibility = !this.formVisibility;
    },

    validateBeforeSubmit() {
      this.$validator.validateAll()
        .then(success => {
          if (!success) {
            return;
          }

          this.form.requestBlocked = true;

          this.$axios({
            url: `//abyssssce.us4.list-manage.com/subscribe/post-json?EMAIL=${this.form.fields.email.value}&FNAME=${this.form.fields.name.value}&u=683be682dd0c7ee522aad76c0&amp;id=19d3feaefa`,
            adapter: jsonpAdapter,
            callbackParamName: 'c'
          }).then(response => {
            if (response.status === 200) {
              if (response.data.result === 'error') {
                this.form.responseMessage = 'Success!';
              } else {
                this.form.responseMessage = 'Success!';
              }

              this.$nextTick(() => {
                this.clearForm();
              });
            } else {
              this.form.responseMessage = 'Error!';
            }

            this.form.requestBlocked = false;
            this.formVisibility = false;
          }).catch(() => {
            this.form.responseMessage = 'Error!';

            this.form.requestBlocked = false;
            this.formVisibility = false;
          });
        });
    }
  },

  beforeDestroy() {}
};
