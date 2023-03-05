function getRandomNumber(min, max, excludeNumber = null) {
  const rand = Math.floor(Math.random() * (max - min)) + min;
  if (rand === excludeNumber && max > 1) {
    const number = getRandomNumber(min, max, excludeNumber);
    return number;
  }
  return rand;
}

function getRandomElement(array, excludeElement = null) {
  let excludeNumber = null;

  if (excludeElement) {
    const index = array.indexOf(excludeElement);
    if (index >= 0) {
      excludeNumber = index;
    }
  }

  return array[getRandomNumber(0, array.length, excludeNumber)];
}

module.exports = {
  getRandomNumber: getRandomNumber,
  getRandomElement: getRandomElement
};
