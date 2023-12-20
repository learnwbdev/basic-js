const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  const isValueUndefined = (value) => {
    const isUndefined = typeof value === 'undefined';
    return isUndefined;
  }

  const isValueString = (value) => {
    const isString = typeof value === 'string';
    return isString;
  }

  const getValueWithDefaultForUndefined = (value, defaultValue) => {
    return isValueUndefined(value) ? defaultValue : value;
  }

  const convertValueToString = (value) => {
    return value + '';
  }

  const isInputStrUndefined = isValueUndefined(str);
  let stringToRepeat = isInputStrUndefined ? '' : str;

  const isInputStrString = isValueString(str);
  stringToRepeat = isInputStrString ? stringToRepeat : convertValueToString(stringToRepeat);

  const isOptionsUndefined = isValueUndefined(options);
  if (isOptionsUndefined) {
    return stringToRepeat;
  }

  options.repeatTimes = getValueWithDefaultForUndefined(options.repeatTimes, 1);
  options.additionRepeatTimes = getValueWithDefaultForUndefined(options.additionRepeatTimes, 1);
  options.separator = getValueWithDefaultForUndefined(options.separator, '+');
  options.additionSeparator = getValueWithDefaultForUndefined(options.additionSeparator, '|');
  options.addition = getValueWithDefaultForUndefined(options.addition, '');
  options.addition = isValueString(options.addition) ? options.addition : convertValueToString(options.addition);

  if (options.repeatTimes === 0) {
    return '';
  }

  let additionRepeated = '';
  for (let i = 0; i < options.additionRepeatTimes; i += 1) {
    const separator = i === 0 ? '' : options.additionSeparator;
    additionRepeated += `${separator}${options.addition}`;
  }

  let stringRepeated = '';
  for (let i = 0; i < options.repeatTimes; i += 1) {
    const separator = i === 0 ? '' : options.separator;
    stringRepeated += `${separator}${stringToRepeat}${additionRepeated}`;
  }

  return stringRepeated;
}

module.exports = {
  repeater
};
