/* eslint-disable */

export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  if (process.env.NODE_ENV !== 'production') return

  (function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
      try {
        w.yaCounter57260659 = new Ya.Metrika({
          id:57260659,
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true
        });
      } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
      s = d.createElement("script"),
      f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
      d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
  })(document, window, "yandex_metrika_callbacks");
  /*
  ** Set the current page
  */
  // https://yandex.ru/support/metrika/code/ajax-flash.xml
  if (window.yaCounter57260659) {yaCounter57260659.hit(location.pathname);}
  /*
  ** Every time the route changes (fired on initialization too)
  */
  app.router.afterEach((to, from) => {
    if (window.yaCounter57260659) {yaCounter57260659.hit(location.pathname);}
  })
}
