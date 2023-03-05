import {TimelineLite} from 'gsap';

export default class Sound {
  constructor(data) {
    this.sound = new Audio(data.value);
    this.sound.loop = data.loop || 1;
    this.sound.volume = data.volume || 0;
    this.tl = new TimelineLite();

    return this;
  }

  play(duration = 1000) {
    this.sound.play();

    this.tl.kill();

    this.tl = new TimelineLite();
    this.tl.to(this.sound, duration / 1000, {
      volume: 1
    });
  }

  pause(duration = 1000) {
    this.tl.kill();

    this.tl = new TimelineLite();
    this.tl.to(this.sound, duration / 1000, {
      volume: 0,
      onComplete: () => {
        this.sound.pause();
      }
    });
  }

  isPaused() {
    return this.sound.paused;
  }
}
