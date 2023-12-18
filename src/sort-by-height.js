const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array with heights, sort them except if the value is -1.
 *
 * @param {Array} arr
 * @return {Array}
 *
 * @example
 * arr = [-1, 150, 190, 170, -1, -1, 160, 180]
 *
 * The result should be [-1, 150, 160, 170, -1, -1, 180, 190]
 */
function sortByHeight(arr) {
  const numbersToSort = arr.filter((value) => value !== -1);
  const numbersSorted = numbersToSort.sort((a, b) => a - b);

  let sortedArray;
  if (arr.includes(-1)) {
    let numbersIndex = -1;
    sortedArray = arr.map((value) => {
      if (value === -1) {
        return value;
      } else {
        numbersIndex += 1;
        return numbersSorted[numbersIndex];
      }
    })
  } else {
    sortedArray = numbersSorted;
  }

  return sortedArray;
}

module.exports = {
  sortByHeight
};
