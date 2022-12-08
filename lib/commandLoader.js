/**
 * @file commandLoader
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const fs = require('fs');
const log = require('./logHandler');
const Discord = require('discord.js');

/* eslint-disable no-sync */
let commands = new Discord.Collection();
let commandFiles = fs.readdirSync('./commands');
log.console(`Loading ${commandFiles.length} commands...`);
for (let file of commandFiles) {
  file = file.replace('.js', '');
  log.console(`Loading command: ${file}`);
  file = require(`../commands/${file}`);
  commands.set(file.help.name.toLowerCase(), file);
  let command = commands.get(file.help.name);
  command.toString = () => {
    return command.help.name;
  };
}
log.console('Done.');

module.exports = commands;
