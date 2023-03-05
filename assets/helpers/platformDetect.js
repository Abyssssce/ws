const detectBrowser = {
  isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,// eslint-disable-line
  isFirefox: typeof InstallTrigger !== 'undefined',
  isSafari: /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
  isIE: /* @cc_on!@*/false || !!document.documentMode,
  isEdge: !function () {this.isIE;} && !!window.StyleMedia, // eslint-disable-line
  isChrome: !!window.chrome && !!window.chrome.webstore,
  isBlink: (function () {this.isChrome;} || function () {this.isOpera;}) && !!window.CSS // eslint-disable-line
};

const detectMobile = {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

module.exports = {
  detectBrowser: detectBrowser,
  detectMobile: detectMobile
};
