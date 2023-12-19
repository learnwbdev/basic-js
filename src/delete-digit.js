const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const stringFromNumber = n.toString();
  const arrayDigits = stringFromNumber.split('');
  const possibleNumbers = [];
  for (let i = 0; i < arrayDigits.length; i += 1) {
    const arrayWoutCurrentDigit = [...arrayDigits];
    const indexDigitToDelete = i;
    const numberOfDigitsToDelete = 1;
    arrayWoutCurrentDigit.splice(indexDigitToDelete, numberOfDigitsToDelete);
    const numberWoutCurrentDigit = +arrayWoutCurrentDigit.join('');
    possibleNumbers.push(numberWoutCurrentDigit);
  }

  const maxPossibleNumber = Math.max(...possibleNumbers);
  return maxPossibleNumber;
}

module.exports = {
  deleteDigit
};
