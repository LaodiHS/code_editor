/**
 * @file Event Handler
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

/**
 * Loads the events
 * @function LoadEvent
 * @param {string} event Name of the event.
 * @returns {function} The event's function.
 */
const LoadEvent = event => require(`../events/${event}`);

/**
 * Handles/Loads all the events.
 * @module eventHandler
 * @param {Client} Client Discord.js Client Object.
 * @returns {void}
 */
module.exports = Client => {
  /**
   * Emitted whenever Client's WebSocket encounters a connection error.
   * @listens error
   */
  Client.on('error', LoadEvent('error'));
  /**
   * Emitted whenever a message is created.
   * @listens message
   */
  Client.on('message', LoadEvent('message'));
  /**
   * Emitted when Client becomes ready to start working.
   * @listens ready
   */
  Client.on('ready', () => LoadEvent('ready')(Client));
  /**
   * Emitted for general warnings.
   * @listens warn
   */
  Client.on('warn', LoadEvent('warn'));
};
