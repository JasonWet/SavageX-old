const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.tickets.topic !== true) return message.channel.send(':x: Command Disabled');

    message.channel.send('TOPIC')
}

module.exports.config = {
    command: 'topic',
    aliases: []
}