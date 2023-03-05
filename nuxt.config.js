const modulesConfig = require('config');

const path = require('path');
const SvgStore = require('webpack-svgstore-plugin');

const isJsRule = rule => {
  return rule.test.toString() === '/\\.js$/i';
};

const isPugRule = rule => {
  return rule.test.toString() === '/\\.pug$/i';
};

const isStylusRule = rule => {
  return rule.test.toString() === '/\\.styl(us)?$/i';
};

const stylusResourcesLoader = {
  loader: 'stylus-loader',
  options: {
    import: path.join(__dirname, 'assets/stylesheets/common/global.styl')
  }
};

const title = 'abysssscce';
const keywords = 'design artdirector web webdesign ux uxdesign ui uidesign uxui uiux ux/ui identity identitydesign packing packingdesign graphic graphicdesign minimal minimaldesign abyss abyss.ssce abyssssce';
const description = 'Underdog / Independent designer / Art Director. Synopsis: Anything is determined by is essence and not by words';
const ogImage = 'https://abyssssce.com/ogimage.jpg';

module.exports = {
  head: {
    title: title,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      {name: 'msapplication-TileColor', content: '#000000'},
      {name: 'msapplication-TileImage', content: '/mstile-144x144.png'},
      {name: 'theme-color', content: '#000000'},
      {hid: 'description', name: 'description', content: description},
      {hid: 'keywords', name: 'keywords', content: keywords},
      {hid: 'ogtitle', property: 'og:title', content: title},
      {hid: 'ogdescription', property: 'og:description', content: description},
      {hid: 'ogimage', property: 'og:image', content: ogImage}
    ],
    link: [
      {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
      {rel: 'manifest', href: '/site.webmanifest'},
      {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#000000'}
    ]
  },
  generate: {
    interval: 100,
    minify: {
      collapseWhitespace: false
    },
    dir: 'dist'
  },
  modules: [
    '@nuxtjs/axios'
  ],
  plugins: [
    '~plugins/axios',
    '~plugins/filters.js',
    '~plugins/directives.js',
    '~plugins/svgstore.js',
    '~plugins/gsap.js',
    '~plugins/vee-validate.js',
    'assets/helpers/animations.js',
    {src: '~plugins/google-analytics-gtag.js', ssr: false}
    // {src: '~plugins/yametrika.js', ssr: false}
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type);
      }
    }
  },
  router: {
    middleware: [
      'theme'
    ],
    extendRoutes(routes, resolve) {
      routes.push({
        name: '404',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      });
    }
  },
  axios: modulesConfig.get('axios'),
  css: [
    '~assets/stylesheets/application.styl'
  ],
  loading: false,
  build: {
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining']
    },
    extractCSS: false,
    vendor: [
      'babel-polyfill'
    ],
    plugins: [
      new SvgStore({
        svgoOptions: {
          plugins: [
            {
              removeTitle: true,
              removeViewBox: true,
              sortAttrs: true,
              addClassesToSVGElement: true,
              addAttributesToSVGElement: true,
              removeStyleElement: true,
              convertStyleToAttrs: true
            }
          ]
        },
        prefix: 'icon-'
      })
    ],
    extend(config) {
      config.module.rules.forEach(rule => {
        if (String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/)) {
          rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
        }

        if (isJsRule(rule)) {
          rule.exclude = [];
          rule.include = [
            path.join(__dirname, 'pages'),
            path.join(__dirname, 'components'),
            path.join(__dirname, 'plugins'),
            path.join(__dirname, 'layouts'),
            path.join(__dirname, 'assets'),
            path.join(__dirname, 'store'),
            path.join(__dirname, '.nuxt'),
            /node_modules\/smooth-scrolling/
          ];
        }
        if (isPugRule(rule)) {
          rule.oneOf.forEach(item => {
            item.use.forEach(use => {
              if (use.loader === 'pug-plain-loader') {
                use.options = {
                  ...use.options,
                  basedir: path.join(__dirname, '/')
                };
              }
            });
          });
        }
        if (isStylusRule(rule)) {
          rule.oneOf.forEach(item => {
            item.use.push(stylusResourcesLoader);
          });
        }
      });

      config.plugins.forEach(rule => {
        if (rule.constructor.name === 'UglifyJsPlugin') {
          rule.options.exclude = /\/node_modules\/smooth-scrolling/;
          rule.options.mangle = {
            except: ['Smooth']
          };
        }
      });

      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      });
    }
  }
};
