const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.information.channel !== true) return message.channel.send(':x: Command Disabled')

    message.channel.send(message.guild.name)
}

module.exports.config = {
    command: 'channel',
    aliases: []
}