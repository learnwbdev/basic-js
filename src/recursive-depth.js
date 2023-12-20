const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    if (Array.isArray(arr)) {
      let depthElements = [];
      for (let element of arr) {
        depthElements.push(this.calculateDepth(element));
      }
      const maxValueForEmptyArray = 0;
      const additionLevelForCurrentArray = 1;
      let maxDepth = Math.max(maxValueForEmptyArray, ...depthElements);
      maxDepth += additionLevelForCurrentArray;
      return maxDepth;
    } else {
      return 0;
    }
  }
}

module.exports = {
  DepthCalculator
};
