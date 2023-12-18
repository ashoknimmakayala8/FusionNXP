const Logger = require("@informa/automation-framework/src/framework/logger");

module.exports = class RandomStringUtil {
  static generateRandomStringFromNumbers(minLength, maxLength) {
    let stringLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    Logger.info(`Random string length: ${stringLength}`)
    let result = "";
    const characters = "0123456789";
    for (let i = 0; i < stringLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    Logger.info(`Random string generated: ${result}`)
    return result;
  }
};
