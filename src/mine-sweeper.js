const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const resultArray = [];
  for (let idxRow = 0; idxRow < matrix.length; idxRow += 1) {
    resultArray[idxRow] = [];
    for (let idxCol = 0; idxCol < matrix[0].length; idxCol += 1) {
      const neighbors8 = [
        matrix[idxRow - 1]?.[idxCol - 1],
        matrix[idxRow - 1]?.[idxCol],
        matrix[idxRow - 1]?.[idxCol + 1],
        matrix[idxRow]?.[idxCol - 1],
        matrix[idxRow]?.[idxCol + 1],
        matrix[idxRow + 1]?.[idxCol - 1],
        matrix[idxRow + 1]?.[idxCol],
        matrix[idxRow + 1]?.[idxCol + 1],
      ];
      const definedNeighbors8 = neighbors8.filter((value) => typeof value !== 'undefined');
      const neighborsMinesQty = definedNeighbors8.reduce((sum, value) => sum + +value, 0);
      resultArray[idxRow][idxCol] = neighborsMinesQty;
    }
  }

  return resultArray;
}

module.exports = {
  minesweeper
};
