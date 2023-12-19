const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  if (typeof str !== 'string') {
    return undefined;
  }

  str = str.trim();
  if (str.length === 0) {
    return str;
  }

  const getLetterEncodePart = (letter, count) => {
    const printNumber = count === 1 ? '' : count;
    const letterEncodePart = `${printNumber}${letter}`;
    return letterEncodePart;
  }

  let currentLetter = str[0];
  let currentCount = 1;
  let resultString = '';
  for (let i = 1; i < str.length; i += 1) {
    if (currentLetter === str[i]) {
      currentCount += 1;
    } else {
      resultString += getLetterEncodePart(currentLetter, currentCount);
      currentCount = 1;
      currentLetter = str[i];
    }
  }
  resultString += getLetterEncodePart(currentLetter, currentCount);

  return resultString;
}

module.exports = {
  encodeLine
};
