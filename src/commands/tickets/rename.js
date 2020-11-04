const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.tickets.rename !== true) return message.channel.send(':x: Command Disabled');

    message.channel.send('RENAME')
}

module.exports.config = {
    command: 'rename',
    aliases: []
}