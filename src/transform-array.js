const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  const CONTROL = -1;
  const ADD = 1;
  const DISCARD = 0;
  const DISCARD_NEXT = '--discard-next';
  const DISCARD_PREV = '--discard-prev';
  const DOUBLE_NEXT = '--double-next';
  const DOUBLE_PREV = '--double-prev';
  const CONTROL_SEQUENCES = [
    DISCARD_NEXT,
    DISCARD_PREV,
    DOUBLE_NEXT,
    DOUBLE_PREV,
  ];
  const copiedArray = [];
  const taggedArray = [];

  const isArrayInput = (inputToCheck) => {
    let isArray = false;
    if (Array.isArray(inputToCheck)) {
      isArray = true;
    }
    return isArray;
  };

  const isStringValue = (valueToCheck) => {
    let isString = false;
    if (typeof valueToCheck === 'string') {
      isString = true;
    }
    return isString;
  };

  const isControlSequence = (valueToCheck) => {
    let isControl = false;

    if (
      isStringValue(valueToCheck) &&
      CONTROL_SEQUENCES.includes(valueToCheck)
    ) {
      isControl = true;
    }
    return isControl;
  };

  const addElement = (element) => {
    copiedArray.push(element);
    taggedArray.push(ADD);
  };

  const addControl = (control) => {
    copiedArray.push(control);
    taggedArray.push(CONTROL);
  };

  const discardNext = (element) => {
    copiedArray.push(element);
    taggedArray.push(DISCARD);
  };

  const discardPrev = (indexToDiscard) => {
    taggedArray[indexToDiscard] = DISCARD;
  };

  const doubleNext = (element) => {
    copiedArray.push(element);
    taggedArray.push(ADD);
  };

  const doublePrev = (element) => {
    copiedArray.push(element);
    taggedArray.push(ADD);
  };

  const skipNext = (index) => {
    return index + 1;
  };

  const shiftIndexForCopiedArray = (index) => {
    return index + 1;
  };

  const isAddElement = (index) => {
    return taggedArray[index] === ADD;
  };

  if (!isArrayInput(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  let shiftIndex = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (isControlSequence(arr[i])) {
      addControl(arr[i]);
      const prevIndex = shiftIndex + i - 1;
      const nextIndex = i + 1;
      const isExistPrevElement = prevIndex >= 0;
      const isExistNextElement = nextIndex < arr.length;
      const prevElement = copiedArray[prevIndex];
      const nextElement = arr[i + 1];
      switch (arr[i]) {
        case DISCARD_NEXT:
          if (isExistNextElement) {
            discardNext(nextElement);
            i = skipNext(i);
          }
          break;
        case DISCARD_PREV:
          if (isExistPrevElement && !isControlSequence(prevElement)) {
            discardPrev(prevIndex);
          }
          break;
        case DOUBLE_NEXT:
          if (isExistNextElement) {
            doubleNext(nextElement);
            shiftIndex = shiftIndexForCopiedArray(shiftIndex);
          }
          break;
        case DOUBLE_PREV:
          if (
            isExistPrevElement &&
            !isControlSequence(prevElement) &&
            taggedArray[prevIndex] !== DISCARD
          ) {
            doublePrev(prevElement);
          }
          break;
        default:
          break;
      }
    } else {
      addElement(arr[i]);
    }
  }

  const transformedArray = copiedArray.filter((_, index) =>
    isAddElement(index)
  );

  return transformedArray;
}

module.exports = {
  transform
};
