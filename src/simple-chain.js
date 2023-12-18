const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chainArray: [],

  getLength() {
    const lengthOfChain = this.chainArray.length;
    return lengthOfChain;
  },
  addLink(value) {
    if (typeof value === 'undefined') {
      value = '';
    }
    this.chainArray.push(value);
    return this;
  },
  removeLink(position) {
    if (
      typeof position === 'undefined' ||
      !Number.isInteger(position) ||
      position > this.getLength() ||
      position < 1
    ) {
      this.chainArray = [];
      throw new Error("You can't remove incorrect link!");
    }
    const indexArray = position - 1;
    this.chainArray.splice(indexArray, 1);
    return this;
  },
  reverseChain() {
    this.chainArray.reverse();
    return this;
  },
  finishChain() {
    const chainString = this.chainArray.map((value) => `( ${value} )`).join('~~');
    this.chainArray = [];
    return chainString;
  }
};

module.exports = {
  chainMaker
};
