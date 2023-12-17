const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  const isInputNotAString = typeof sampleActivity !== 'string';
  const sampleActivityNumber = +sampleActivity;
  const isSampleActivityNotNumber = !Number.isFinite(sampleActivityNumber);
  const isSampleActivityLargerModern = sampleActivityNumber > MODERN_ACTIVITY;
  const isSampleActivityNegativeOrZero = sampleActivityNumber <= 0;
  if (
    isInputNotAString ||
    isSampleActivityNotNumber ||
    isSampleActivityLargerModern || isSampleActivityNegativeOrZero
  ) {
    return false;
  }

  const ln2 = Math.LN2.toFixed(3);
  const kRadioactiveDelayRateC14 = ln2 / HALF_LIFE_PERIOD;
  const rateN0toN = MODERN_ACTIVITY / sampleActivityNumber;
  const elapsedAge = Math.log(rateN0toN) / kRadioactiveDelayRateC14;
  const elapsedAgeRounded = Math.ceil(elapsedAge);
  const elapsedAgeInteger = Math.trunc(elapsedAgeRounded);
  return elapsedAgeInteger;
}

module.exports = {
  dateSample
};
