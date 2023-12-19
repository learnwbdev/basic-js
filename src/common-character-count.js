const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const countCharFirstStr = new Map();
  const counrCharSecndStr = new Map();

  const countCharInMap = (mapForChar, char) => {
    if (mapForChar.has(char)) {
      const count = mapForChar.get(char);
      mapForChar.set(char, count + 1);
    } else {
      mapForChar.set(char, 1);
    }
  }

  [...s1].forEach((char) => {
    countCharInMap(countCharFirstStr, char);
  });
  [...s2].forEach((char) => {
    countCharInMap(counrCharSecndStr, char);
  });

  let qtyAllCommonChar = 0;
  countCharFirstStr.forEach((value, key) => {
    if (counrCharSecndStr.has(key)) {
      const qtyCharInFirst = value;
      const qtyCharInSecnd = counrCharSecndStr.get(key);
      const qtyCommonChar = Math.min(qtyCharInFirst, qtyCharInSecnd);
      qtyAllCommonChar += qtyCommonChar;
    }
  })

  return qtyAllCommonChar;
}

module.exports = {
  getCommonCharacterCount
};
