const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const getFileNameWithSuffix = (mapWithUniqueNames, currentName) => {
    const isFirstOccurence = !mapWithUniqueNames.has(currentName);
    const countName = mapWithUniqueNames.get(currentName);
    const suffix = isFirstOccurence ? '' : `(${countName})`;
    const firstCountNameValue = 1;
    const newCountNameValue = isFirstOccurence ? firstCountNameValue : countName + 1;
    uniqueNames.set(currentName, newCountNameValue);
    const fileNameWithSuffix = `${currentName}${suffix}`;

    if (isFirstOccurence) {
      return fileNameWithSuffix;
    } else {
      return getFileNameWithSuffix(mapWithUniqueNames, fileNameWithSuffix);
    }
  }

  const uniqueNames = new Map();
  const resultFileNames = [];

  for (let name of names) {
    const fileNameWithSuffix = getFileNameWithSuffix(uniqueNames, name);
    resultFileNames.push(fileNameWithSuffix);
  }

  return resultFileNames;
}

module.exports = {
  renameFiles
};
