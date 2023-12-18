const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an email address, return it's domain.
 *
 * @param {String} email
 * @return {String}
 *
 * @example
 * For the input 'prettyandsimple@example.com', the output should be 'example.com'
 *
 */
function getEmailDomain(email) {
  const emailParts = email.split('@');
  const lastEmailPart = emailParts.slice(-1);
  const emailDomain = lastEmailPart[0];
  return emailDomain;
}

module.exports = {
  getEmailDomain
};
