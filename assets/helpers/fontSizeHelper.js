const props = {
  target: document.querySelector('html'),
  bp: {
    mobile: {
      width: 767,
      height: 640,
      fontSize: 13
    },
    tablet: {
      width: 960,
      height: 750,
      fontSize: 13
    },
    desktop: {
      width: 1280,
      height: 900,
      fontSize: 13
    }
  }
};

function update(bp) {
  const heightSuccess = window.innerHeight;
  const widthSuccess = window.innerWidth;

  const contentBoxWidth = props.bp[bp].width;
  const contentBoxHeight = props.bp[bp].height;
  const baseFontSize = props.bp[bp].fontSize;

  const differentHeight = heightSuccess - contentBoxHeight;
  const differentWidth = widthSuccess - contentBoxWidth;

  let scale;

  if (widthSuccess > contentBoxWidth && heightSuccess > contentBoxHeight) {
    if (widthSuccess / heightSuccess <= contentBoxWidth / contentBoxHeight) {
      scale = widthSuccess / contentBoxWidth;
    } else {
      scale = heightSuccess / contentBoxHeight;
    }
  } else {
    if (differentHeight < 0) {
      scale = (contentBoxHeight - Math.abs(differentHeight)) / contentBoxHeight;
      if (scale < .3) {
        scale = .3;
      }
    } else {
      scale = 1;
    }

    if (differentWidth < 0) {
      const scallWidth = (contentBoxWidth - Math.abs(differentWidth)) / contentBoxWidth;

      if (scallWidth < scale) {
        scale = scallWidth;
      }
      if (scale < .3) {
        scale = .3;
      }
    }
  }

  let fontSize = Math.floor(scale * baseFontSize);
  fontSize = fontSize > baseFontSize ? baseFontSize : fontSize;

  props.target.style.fontSize = `${fontSize}px`;

  return fontSize;
}

module.exports = {
  update: update
};
