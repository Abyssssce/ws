import * as THREE from 'three';
THREE.Cache.enabled = true;
const loader = new THREE.TextureLoader();

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = resolve;
    image.src = url;
  });
}

function loadThreeImage(url) {
  return new Promise(resolve => {
    loader.load(url, resolve);
  });
}

function loadThreeVideo(image) {
  const cashedVideo = document.querySelector(`video[poster="${image.image}"]`);
  let video;

  if (cashedVideo) {
    video = cashedVideo;
  } else {
    video = document.createElement('video');
    video.style.visibility = 'hidden';
    video.poster = image.image;
    video.muted = true;
    video.loop = true;

    document.body.appendChild(video);

    const sourceMP4 = document.createElement('source');
    sourceMP4.type = 'video/mp4';
    sourceMP4.src = image.mp4;
    video.appendChild(sourceMP4);

    const sourceOGV = document.createElement('source');
    sourceOGV.type = 'video/ogv';
    sourceOGV.src = image.ogv;
    video.appendChild(sourceOGV);

    const sourceWEBM = document.createElement('source');
    sourceWEBM.type = 'video/webm';
    sourceWEBM.src = image.webm;
    video.appendChild(sourceWEBM);

    video.play();
  }

  return new THREE.VideoTexture(video);
}

export {
  loadImage,
  loadThreeImage,
  loadThreeVideo
};
