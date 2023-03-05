import * as THREE from 'three';
import {TweenMax, Expo} from 'gsap';

THREE.Cache.enabled = true;

const loader = new THREE.TextureLoader();

import {loadThreeImage, loadThreeVideo} from 'assets/helpers/loadImage';

export default {
  name: 'image-distortion',

  components: {},

  props: {
    opts: {
      type: Object
    },
    image: {},
    images: {
      type: Array,
      required: true
    },
    autoInit: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      textures: [],

      raf: null,

      ready: false,
      scene: false,
      camera: false,
      imageAspect: null,
      object: null,
      renderer: null,
      disp: null,
      texture1: null,
      texture2: null,
      mat: null,
      a1: null,
      a2: null
    };
  },

  computed: {},

  watch: {
    image: {
      handler: async function (image, oldImage) {
        if (image && this.ready) {
          this.texture1 = await this.loadResource(image);

          if (oldImage) {
            this.texture2 = await this.loadResource(oldImage);
          } else {
            this.texture2 = this.texture1;
          }

          this.mat.uniforms.texture1 = {
            type: 't',
            value: this.texture1
          };

          this.mat.uniforms.texture2 = {
            type: 't',
            value: this.texture2
          };

          this.animateTexture();
        }
      }
    }
  },

  created() {},

  mounted() {
    if (this.autoInit) {
      this.loadImages();
    }

    this.raf = window.requestAnimationFrame(this.render);
  },

  methods: {
    animateTexture() {
      const speedOut = this.firstDefined(this.opts?.speedOut, this.opts?.speed, 2.2);
      const easing = this.firstDefined(this.opts?.easing, Expo.easeOut);

      TweenMax.fromTo(this.mat.uniforms.dispFactor, speedOut, {
        value: 1,
        ease: easing
      }, {
        value: 0,
        ease: easing
        // onUpdate: this.render,
        // onComplete: this.render
      });

      TweenMax.to(this.$el, .3, {
        scale: .95
      });

      TweenMax.to(this.$el, .3, {
        scale: 1,
        delay: .3
      });
    },

    update() {
      if (this.ready) {
        this.setSize();
      } else {
        this.loadImages();
      }
    },

    async loadResource(image) {
      const findItem = this.textures.find(item => item.image === image || item.image === image?.image);

      let texture;
      let imageId;

      if (findItem) {
        return findItem.texture;
      } else if (typeof image === 'string') {
        texture = await loadThreeImage(image);
        imageId = image;
      } else {
        texture = await loadThreeVideo(image);
        imageId = image.image;
      }

      this.textures.push({
        image: imageId,
        texture: texture
      });

      texture = THREE.LinearFilter;
      texture = THREE.LinearFilter;

      return texture;
    },

    loadImages() {
      const promises = this.images.map(image => {
        return this.loadResource(image);
      });

      return Promise.all(promises).then(() => {
        this.init();
      });
    },

    async init() {
      this.ready = true;

      const dispImage = this.firstDefined(this.opts?.displacementImage, '/images/displacement/dmap.jpg');
      const imagesRatio = this.firstDefined(this.opts?.imagesRatio, 1.0);

      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(
        this.$el.offsetWidth / -2,
        this.$el.offsetWidth / 2,
        this.$el.offsetHeight / 2,
        this.$el.offsetHeight / -2,
        1,
        1000
      );

      this.camera.position.z = 1;

      this.renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true
      });

      this.renderer.setPixelRatio(2.0);
      this.renderer.setClearColor(0xffffff, 0.0);
      this.renderer.setSize(this.$el.offsetWidth, this.$el.offsetHeight);
      this.$el.appendChild(this.renderer.domElement);

      loader.crossOrigin = '';

      this.disp = loader.load(dispImage);
      this.disp.magFilter = this.disp.minFilter = THREE.LinearFilter;

      this.texture1 = this.texture2 = await this.loadResource(this.image);

      if (this.texture1.image) {
        this.imageAspect = this.texture1.image.height / this.texture1.image.width;
        // this.setSize();
      }

      this.texture1.magFilter = this.texture2.magFilter = THREE.LinearFilter;
      this.texture1.minFilter = this.texture2.minFilter = THREE.LinearFilter;

      this.imageAspect = imagesRatio;

      if (this.$el.offsetHeight / this.$el.offsetWidth < this.imageAspect) {
        this.a1 = 1;
        this.a2 = this.$el.offsetHeight / this.$el.offsetWidth / this.imageAspect;
      } else {
        this.a1 = (this.$el.offsetWidth / this.$el.offsetHeight) * this.imageAspect;
        this.a2 = 1;
      }

      this.setMat();

      const geometry = new THREE.PlaneBufferGeometry(this.$el.offsetWidth, this.$el.offsetHeight, 1);

      this.object = new THREE.Mesh(geometry, this.mat);
      this.scene.add(this.object);

      window.addEventListener('resize', () => {
        this.setSize();
      });

      this.animateTexture();
    },

    render() {
      if (this.raf) {
        if (this.renderer) {
          this.renderer.render(this.scene, this.camera);
        }

        window.requestAnimationFrame(this.render);
      }
    },

    setSize() {
      if (this.$el.offsetHeight / this.$el.offsetWidth < this.imageAspect) {
        this.a1 = 1;
        this.a2 = this.$el.offsetHeight / this.$el.offsetWidth / this.imageAspect;
      } else {
        this.a1 = (this.$el.offsetWidth / this.$el.offsetHeight) * this.imageAspect;
        this.a2 = 1;
      }

      this.object.material.uniforms.res.value = new THREE.Vector4(this.$el.offsetWidth, this.$el.offsetHeight, this.a1, this.a2);

      this.renderer.setSize(this.$el.offsetWidth, this.$el.offsetHeight);
    },

    setMat() {
      const vertex = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `;

      const fragment = `
        varying vec2 vUv;
        uniform float dispFactor;
        uniform float dpr;
        uniform sampler2D disp;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform float angle1;
        uniform float angle2;
        uniform float intensity1;
        uniform float intensity2;
        uniform vec4 res;
        uniform vec2 parent;
        mat2 getRotM(float angle) {
          float s = sin(angle);
          float c = cos(angle);
          return mat2(c, -s, s, c);
        }
        void main() {
          vec4 disp = texture2D(disp, vUv);
          vec2 dispVec = vec2(disp.r, disp.g);
          vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy) ;
          vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);
          vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;
          vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
          vec4 _texture1 = texture2D(texture1, distortedPosition1);
          vec4 _texture2 = texture2D(texture2, distortedPosition2);
          gl_FragColor = mix(_texture1, _texture2, dispFactor);
        }
      `;

      const commonAngle = this.firstDefined(this.opts?.angle, Math.PI / 4); // 45 degrees by default, so grayscale images work correctly
      const intensity1 = this.firstDefined(this.opts?.intensity1, this.opts?.intensity, .2);
      const intensity2 = this.firstDefined(this.opts?.intensity2, this.opts?.intensity, .2);
      const angle1 = this.firstDefined(this.opts?.angle1, commonAngle * 2);
      const angle2 = this.firstDefined(this.opts?.angle2, -commonAngle * 4);

      this.mat = new THREE.ShaderMaterial({
        uniforms: {
          intensity1: {
            type: 'f',
            value: intensity1
          },
          intensity2: {
            type: 'f',
            value: intensity2
          },
          dispFactor: {
            type: 'f',
            value: 0.0
          },
          angle1: {
            type: 'f',
            value: angle1
          },
          angle2: {
            type: 'f',
            value: angle2
          },
          texture1: {
            type: 't',
            value: this.texture1
          },
          texture2: {
            type: 't',
            value: this.texture2
          },
          disp: {
            type: 't',
            value: this.disp
          },
          res: {
            type: 'vec4',
            value: new THREE.Vector4(this.$el.offsetWidth, this.$el.offsetHeight, this.a1, this.a2)
          },
          dpr: {
            type: 'f',
            value: window.devicePixelRatio
          }
        },

        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0
      });
    },

    firstDefined() {
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) { // eslint-disable-line
          return arguments[i]; // eslint-disable-line
        }
      }
    }
  },

  beforeDestroy() {
    window.cancelAnimationFrame(this.raf);
    this.raf = null;
  }
};
