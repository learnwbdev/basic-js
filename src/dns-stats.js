const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const countDNS = new Map();
  for (let domain of domains) {
    const arrayDNS= domain.split('.');
    arrayDNS.reverse();
    let currentDns = '';
    for (let dns of arrayDNS) {
      currentDns += `.${dns}`;
      const isFirstOccurence = !countDNS.has(currentDns);
      const currentCount = isFirstOccurence ? 0 : countDNS.get(currentDns);
      countDNS.set(currentDns, currentCount + 1);
    }
  }

  const resultCount = {};
  countDNS.forEach((value, key) => {
    resultCount[key] = value;
  })

  return resultCount;
}

module.exports = {
  getDNSStats
};
