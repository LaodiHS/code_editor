/**
 * @file Log Handler
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const color = require('chalk');

/* eslint-disable no-console*/
/**
 * Used to display the warning messages.
 * @function warn
 * @param {...string} message Message(s) to be shown in the warn log.
 * @returns {void}
 */
exports.warn = (...message) => {
  console.log(color.yellow('<WARNING>'));
  console.warn(...message);
  console.log(color.yellow('</WARNING>'));
};

/**
 * Used to display the error messages.
 * @function error
 * @param {...string} message Message(s) to be shown in the error log.
 * @returns {void}
 */
exports.error = (...message) => {
  console.log(color.red('<ERROR>'));
  console.error(...message);
  console.trace();
  console.log(color.red('</ERROR>'));
};

/**
 * Used to log messages in the console.
 * @function error
 * @param {...string} message Message(s) to be shown in the error log.
 * @returns {void}
 */
exports.console = (...message) => {
  console.log(...message);
};
