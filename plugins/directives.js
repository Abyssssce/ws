import Vue from 'vue';

Vue.directive('focus', {
  inserted: function (el) {
    el.getElementsByTagName('INPUT')[0].focus();
  }
});

Vue.directive('anchor', {
  bind: function (el, binding) {
    const scrollElement = document.querySelector('.page__wrapper');

    el.addEventListener('click', () => {
      const hashElement = document.querySelector(binding.value);

      if (hashElement) {
        const scrollTop = hashElement.getBoundingClientRect().top + scrollElement.scrollTop;
        TweenLite.to(scrollElement, .5, {scrollTo: scrollTop});
      }
    });
  }
});
