const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  const isMembersNotArray = Array.isArray(members);
  if (!isMembersNotArray) {
    return false;
  }
  const filteredMembersOnlyStrings = members.filter((name) => typeof name === 'string');
  const membersFirstLetterUppercase = filteredMembersOnlyStrings.map((name) => {
    const nameWoutWhiteSpaces = name.trim();
    const firstLetterOfName= nameWoutWhiteSpaces[0];
    const firstLetterUppercase = firstLetterOfName.toUpperCase();
    return firstLetterUppercase;
  });
  membersFirstLetterUppercase.sort();
  const dreamTeamName = membersFirstLetterUppercase.join('');
  return dreamTeamName;
}

module.exports = {
  createDreamTeam
};
