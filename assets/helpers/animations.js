function fadeIn(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {opacity: 0, transition: 'none'})
    .to(el, .3, {opacity: 1, clearProps: 'opacity, transition'}, delay);
}

function fadeOut(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {opacity: 1, transition: 'none'})
    .to(el, .3, {opacity: 0}, delay);
}

function fadeInUp(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {opacity: 0, y: 40, transition: 'none'})
    .to(el, .6, {opacity: 1, y: 0, clearProps: 'opacity, y, transition'}, delay);
}

function fadeInDown(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {opacity: 0, y: -20, transition: 'none'})
    .to(el, .3, {opacity: 1, y: 0, clearProps: 'opacity, y, transition'}, delay);
}

function fadeOutUp(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {opacity: 1, y: 0, transition: 'none'})
    .to(el, .3, {opacity: 0, y: -20}, delay);
}

function fadeOutDown(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {opacity: 1, y: 0, transition: 'none'})
    .to(el, .6, {opacity: 0, y: 40}, delay);
}

function scaleIn(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {scale: 0, transition: 'none'})
    .to(el, .3, {scale: 1, clearProps: 'scale, transition'}, delay);
}

function scaleOut(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {scale: 1, transition: 'none'})
    .to(el, .3, {scale: 0}, delay);
}

function slideIn(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {height: 0, overflow: 'hidden', transition: 'none'})
    .to(el, .3, {height: el.firstChild.offsetHeight, clearProps: 'overflow, height, transition'}, delay);
}

function slideOut(el, done, delay = '+=0') {
  const tl = new TimelineLite({onComplete: done});

  tl.set(el, {height: el.offsetHeight, transition: 'none', overflow: 'hidden'})
    .to(el, .3, {height: 0}, delay);
}

module.exports = {
  fadeIn: fadeIn,
  fadeOut: fadeOut,
  fadeInUp: fadeInUp,
  fadeInDown: fadeInDown,
  fadeOutUp: fadeOutUp,
  fadeOutDown: fadeOutDown,
  scaleIn: scaleIn,
  scaleOut: scaleOut,
  slideIn: slideIn,
  slideOut: slideOut
};
