const { NotImplementedError } = require('../extensions/index.js');

/**
 * The MAC-48 address is six groups of two hexadecimal digits (0 to 9 or A to F),
 * separated by hyphens.
 *
 * Your task is to check by given string inputString
 * whether it's a MAC-48 address or not.
 *
 * @param {Number} inputString
 * @return {Boolean}
 *
 * @example
 * For 00-1B-63-84-45-E6, the output should be true.
 *
 */
function isMAC48Address(n) {
  const macGroups = n.split("-");
  const hasSixGroups = macGroups.length === 6;
  if (!hasSixGroups) {
    return false;
  }

  for (let group of macGroups) {
    const digitsInGroup = group.split('');
    const hasTwoDigits = digitsInGroup.length === 2;
    if (!hasTwoDigits) {
      return false;
    }
    for (let digit of digitsInGroup) {
      const parsedDigit = Number.parseInt(digit, 16);
      if (!Number.isInteger(parsedDigit)) {
        return false;
      }
    }
  }

  return true;
}
module.exports = {
  isMAC48Address
};
