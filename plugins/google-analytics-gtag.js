/* eslint-disable */

export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  if (process.env.NODE_ENV !== 'production') return;

  // https://developers.google.com/analytics/devguides/collection/gtagjs/?hl=ru
  // https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications

  const ID = 'UA-157272077-2';

  (function (i, s, o, g, r, a, m) {
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', `https://www.googletagmanager.com/gtag/js?id=${ID}`);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', ID);

  /*
  ** Every time the route changes (fired on initialization too)
  */
  app.router.afterEach((to) => {
    gtag('config', ID, {'page_path': to.path});
  })
}
