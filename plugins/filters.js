import Vue from 'vue';

Vue.filter('capitalize', string => {
  if (typeof string === 'string') {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
});

Vue.filter('moneyFormat', (number = 0, n, x = 3, s = ' ', c) => {
  const re = '\\d(?=(\\d{' + x + '})+' + (n > 0 ? '\\D' : '$') + ')';
  const num = number.toFixed(Math.max(0, ~~n));
  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + s);
});

Vue.filter('pluralize', (number, words) => {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return words[2];
  }
  number %= 10;
  if (number === 1) {
    return words[0];
  }
  if (number >= 2 && number <= 4) {
    return words[1];
  }
  return words[2];
});

Vue.filter('toFixed', (value, count = 0) => {
  if (value) {
    return value.toFixed(count);
  }

  return value;
});

Vue.filter('getCleanPhoneNumber', string => {
  return string.replace(/ |-|—|\(|\)/gi, '').replace(/\+7/gi, '8');
});

Vue.filter('normalizeCamel', string => {
  return string.replace(/_/gi, ' ');
});

Vue.filter('removeTags', string => {
  if (typeof document !== 'undefined') {
    const tmp = document.createElement('div');
    tmp.innerHTML = string;
    return tmp.textContent || tmp.innerText || '';
  }
  return string;
});

Vue.filter('stringify', value => {
  return JSON.stringify(value);
});

Vue.filter('toHHMMSS', secondsValue => {
  secondsValue = parseInt(secondsValue, 10); // don't forget the second param
  let hours = Math.floor(secondsValue / 3600);
  let minutes = Math.floor((secondsValue - (hours * 3600)) / 60);
  let seconds = secondsValue - (hours * 3600) - (minutes * 60);

  if (hours < 10) {hours = `0${hours}`;}
  if (seconds < 10) {seconds = `0${seconds}`;}

  if (hours === '00') {
    return `${minutes}:${seconds}`;
  }

  if (minutes < 10) {minutes = `0${minutes}`;}

  return `${hours}:${minutes}:${seconds}`;
});
