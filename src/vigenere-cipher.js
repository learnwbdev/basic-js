const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  #alphabetLength = 26;
  #startCodeLetterA = 'A'.charCodeAt(0);
  #regExpLatinLetter = /[A-Z]/;
  #errorMessageIncorrectArguments = 'Incorrect arguments!';

  constructor(isDirectMachine) {
    const isInputUndefined = this.#isValueUndefined(isDirectMachine);
    if (isInputUndefined || isDirectMachine) {
      this.isDirectMachine = true;
    } else {
      this.isDirectMachine = false;
    }
  }

  #isValueUndefined(value) {
    return typeof value === 'undefined';
  }

  #isArgumentsIncorrect(message, key) {
    const isMessageUndefined = this.#isValueUndefined(message);
    const isKeyUndefined = this.#isValueUndefined(key);
    const isIncorrect = isMessageUndefined || isKeyUndefined;
    return isIncorrect;
  }

  #getShiftNumber(latinLetterUpperCase) {
    const letterCode = latinLetterUpperCase.charCodeAt(0);
    const letterIndexInAlphabet = letterCode - this.#startCodeLetterA;
    return letterIndexInAlphabet;
  }

  #getShiftedLetter(latinLetterUpperCase, shiftNumber, isUnShift = false) {
    const shiftDirection = isUnShift ? -1 : 1;
    const shiftNumberWithDirection = shiftDirection * shiftNumber;
    const shiftNumberForwardDirection = this.#alphabetLength + shiftNumberWithDirection;
    const letterCode = latinLetterUpperCase.charCodeAt(0);
    const letterIndexInAlphabet = letterCode - this.#startCodeLetterA;
    const shiftedIndex = (letterIndexInAlphabet + shiftNumberForwardDirection) % this.#alphabetLength;
    const shiftedCode = this.#startCodeLetterA + shiftedIndex;
    const shiftedLetter = String.fromCharCode(shiftedCode);
    return shiftedLetter;
  }

  #getNextIndexForKey(currentIndex, keyLength) {
    const nextIndexForward = currentIndex + 1;
    const nextIndexWrapAround = nextIndexForward % keyLength;
    return nextIndexWrapAround;
  }

  #getReversedMessage(message) {
    const arrayDirectMessageLetters = [...message];
    const arrayReversedMessageLetters = arrayDirectMessageLetters.reverse();
    const reversedMessage = arrayReversedMessageLetters.join('');
    return reversedMessage;
  }

  #getResultMessageForMachine(message) {
    const reversedMessage = this.isDirectMachine ? '' : this.#getReversedMessage(message);
    const resultMessage = this.isDirectMachine ? message : reversedMessage;
    return resultMessage;
  }

  encrypt(message, key) {
    const isArgumentsIncorrect = this.#isArgumentsIncorrect(message, key);
    if (isArgumentsIncorrect) {
      throw new Error(this.#errorMessageIncorrectArguments);
    }

    const messageUpperCase = message.toUpperCase();
    const keyUpperCase = key.toUpperCase();
    const keyLength = keyUpperCase.length;
    let keyIndex = 0;
    let encryptedMessage = '';
    for (let i = 0; i < messageUpperCase.length; i += 1) {
      const originalLetter = messageUpperCase[i];
      const isLatinLetter = this.#regExpLatinLetter.test(originalLetter);
      let shiftedLetter;
      if (isLatinLetter) {
        const keyLetter = keyUpperCase[keyIndex];
        const shiftNumberFromKey = this.#getShiftNumber(keyLetter);
        shiftedLetter = this.#getShiftedLetter(originalLetter, shiftNumberFromKey);
        keyIndex = this.#getNextIndexForKey(keyIndex, keyLength);
      }
      const letterToWrite = isLatinLetter ? shiftedLetter : originalLetter;
      encryptedMessage += letterToWrite;
    }

    const resultEncryptedMessage = this.#getResultMessageForMachine(encryptedMessage);
    return resultEncryptedMessage;
  }

  decrypt(encryptedMessage, key) {
    const isArgumentsIncorrect = this.#isArgumentsIncorrect(encryptedMessage, key);
    if (isArgumentsIncorrect) {
      throw new Error(this.#errorMessageIncorrectArguments);
    }

    const encryptMessageUpperCase = encryptedMessage.toUpperCase();
    const keyUpperCase = key.toUpperCase();
    const keyLength = keyUpperCase.length;
    const isUnShift = true;
    let keyIndex = 0;
    let decryptedMessage = '';
    for (let i = 0; i < encryptMessageUpperCase.length; i += 1) {
      const originalLetter = encryptMessageUpperCase[i];
      const isLatinLetter = this.#regExpLatinLetter.test(originalLetter);
      let unShiftedLetter;
      if (isLatinLetter) {
        const keyLetter = keyUpperCase[keyIndex];
        const shiftNumberFromKey = this.#getShiftNumber(keyLetter);
        unShiftedLetter = this.#getShiftedLetter(originalLetter, shiftNumberFromKey, isUnShift);
        keyIndex = this.#getNextIndexForKey(keyIndex, keyLength);
      }
      const letterToWrite = isLatinLetter ? unShiftedLetter : originalLetter;
      decryptedMessage += letterToWrite;
    }

    const resultDecryptedMessage = this.#getResultMessageForMachine(decryptedMessage);
    return resultDecryptedMessage;
  }
}

module.exports = {
  VigenereCipheringMachine
};
