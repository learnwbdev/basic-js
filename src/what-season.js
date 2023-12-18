const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  const isInputDateProvided = (inputToCheck) => {
    let isProvided = false;
    if (typeof date !== 'undefined') {
      isProvided = true;
    }
    return isProvided;
  }

  const hasValueOfProperty = (dateToCheck) => {
    let hasValueOf = false;
    const isInputDateObject = date instanceof Date;
    const isInputDateHasValueOf = isInputDateObject ? 'valueOf' in date : false;
    if (isInputDateObject && isInputDateHasValueOf) {
      hasValueOf = true;
    }
    return hasValueOf;
  }

  const isNumberDateInMs = (dateToCheck) => {
    let isNumber = false;
    let isInputDateAsMs;
    try {
      isInputDateAsMs = dateToCheck.valueOf();
    } catch (error) {
      throw new Error('Invalid date!');
    }
    const isInputDateNumber = Number.isFinite(isInputDateAsMs);
    if (isInputDateNumber) {
      isNumber = true;
    }
    return isNumber;
  }

  const isValidDateObject = (objectToCheck) => {
    let isDateObject = true;
    const checkDate = new Date(objectToCheck.valueOf());
    try {
      if (objectToCheck.getDate() !== checkDate.getDate()) {
        isDateObject = false;
      }
      if (objectToCheck.getDay() !== checkDate.getDay()) {
        isDateObject = false;
      }
      if (objectToCheck.getFullYear() !== checkDate.getFullYear()) {
        isDateObject = false;
      }
      if (objectToCheck.getHours() !== checkDate.getHours()) {
        isDateObject = false;
      }
      if (objectToCheck.getMilliseconds() !== checkDate.getMilliseconds()) {
        isDateObject = false;
      }
      if (objectToCheck.getMinutes() !== checkDate.getMinutes()) {
        isDateObject = false;
      }
      if (objectToCheck.getMonth() !== checkDate.getMonth()) {
        isDateObject = false;
      }
      if (objectToCheck.getSeconds() !== checkDate.getSeconds()) {
        isDateObject = false;
      }
      if (objectToCheck.getTime() !== checkDate.getTime()) {
        isDateObject = false;
      }
    } catch (error) {
      throw new Error('Invalid date!');
    }

    return isDateObject;
  }

  if (!isInputDateProvided(date)) {
    return 'Unable to determine the time of year!';
  }
  if (!(hasValueOfProperty(date) &&
        isNumberDateInMs(date) &&
        isValidDateObject(date)
       )
     ) {
    throw new Error('Invalid date!');
  }

  const monthFromDateZeroBased = date.getMonth();
  const monthFromDateOneBased = monthFromDateZeroBased + 1;
  const springMonths = [3, 4, 5];
  const summerMonths = [6, 7, 8];
  const autumnMonths = [9, 10, 11];
  const winterMonths = [12, 1, 2];
  let seasonValue;
  if (springMonths.includes(monthFromDateOneBased)) {
    seasonValue = 'spring';
  } else if (summerMonths.includes(monthFromDateOneBased)) {
    seasonValue = 'summer';
  } else if (autumnMonths.includes(monthFromDateOneBased)) {
    seasonValue = 'autumn';
  } else if (winterMonths.includes(monthFromDateOneBased)) {
    seasonValue = 'winter';
  };

  return seasonValue;
}

module.exports = {
  getSeason
};
