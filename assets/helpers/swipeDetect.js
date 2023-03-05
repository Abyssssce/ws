export default class SwipeDetect {
  constructor(options, callback) {
    this.options = options;
    this.touchsurface = options.element;
    let swipedir;
    let startX;
    let startY;
    let distX;
    let distY;
    const threshold = 50; // required min distance traveled to be considered swipe
    const restraint = 300; // maximum distance allowed at the same time in perpendicular direction
    const allowedTime = 3000; // maximum time allowed to travel that distance
    let elapsedTime;
    let startTime;
    const handleswipe = callback || function () {};

    this.onTouchstart = e => {
      const touchobj = e.changedTouches[0];
      swipedir = 'none';
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
      // e.preventDefault();
    };

    this.onTouchmove = e => {
      if (this.options.preventMove) {
        e.preventDefault(); // prevent scrolling when inside DIV
      }
    };

    this.onTouchend = e => {
      const touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      if (elapsedTime <= allowedTime){ // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
          swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
        }
        else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
          swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir);
      // e.preventDefault();
    };

    return this;
  }

  run() {
    this.touchsurface.addEventListener('touchstart', this.onTouchstart, false);
    this.touchsurface.addEventListener('touchmove', this.onTouchmove, false);
    this.touchsurface.addEventListener('touchend', this.onTouchend, false);
  }

  destroy() {
    this.touchsurface.removeEventListener('touchstart', this.onTouchstart, false);
    this.touchsurface.removeEventListener('touchmove', this.onTouchmove, false);
    this.touchsurface.removeEventListener('touchend', this.onTouchend, false);
  }
}
