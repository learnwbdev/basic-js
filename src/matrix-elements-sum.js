const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
  const valuesAboveZero = [];
  for (let idxCol = 0; idxCol < matrix[0].length; idxCol += 1) {
    for (let idxRow = 0; idxRow < matrix.length; idxRow += 1) {
      const currentElement = matrix[idxRow][idxCol];
      if (currentElement === 0) {
        break;
      } else {
        valuesAboveZero.push(currentElement);
      }
    }
  }

  const sumValuesAboveZero = valuesAboveZero.reduce((sum, value) => sum + value, 0);
  return sumValuesAboveZero;
}

module.exports = {
  getMatrixElementsSum
};
