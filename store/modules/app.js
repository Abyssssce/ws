const platformDetect = process.browser
  ? require('assets/helpers/platformDetect.js')
  : null;

const scrollBarHelper = process.browser
  ? require('assets/helpers/scrollBarHelper.js')
  : null;

export default {
  state: () => {
    return {
      currentLayout: null,
      cursor: 'default',
      fontSize: 0,
      isLoad: null,
      isMobilePlatform: platformDetect ? platformDetect.detectMobile.isMobile : null,
      isReady: null,
      sizes: null,
      uiColor: 'black',
      blur: false,
      cursorCoordinates: null,
      interactiveHoverNode: null,
      scrollBar: {
        width: scrollBarHelper ? scrollBarHelper.getScrollBarWidth() : null
      }
    };
  },
  mutations: {
    setFocus: (state, payload) => {
      state.blur = false;
      state.interactiveHoverNode = payload;
    },
    setBlur: state => {
      state.blur = true;
    },
    setCursorCoordinates(state, payload) {
      state.cursorCoordinates = payload;
    },
    setAppReady(state, payload) {
      state.isReady = payload;
    },
    setAppLoad(state, payload) {
      state.isLoad = payload;
    },
    setCurrentLayout(state, device) {
      state.currentLayout = device;
    },
    setFontSize(state, payload) {
      state.fontSize = payload;
    },
    setSizes(state, payload) {
      state.sizes = payload;
    },
    setUiColor(state, payload) {
      state.uiColor = payload;
    },
    setIsMobilePlatform(state) {
      state.isMobilePlatform = platformDetect ? platformDetect.detectMobile.isMobile : null;
    }
  },
  getters: {
    getScrollBarWidth: state => {
      return `${state.sizes?.scrollbar?.width}px`;
    },
    isMobile: state => {
      return state.currentLayout === 'mobile';
    },
    isTablet: state => {
      return state.currentLayout === 'tablet';
    },
    isDesktop: state => {
      return state.currentLayout === 'desktop';
    }
  }
};
