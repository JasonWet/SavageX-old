const Discord = module.require('discord.js');
const toggles = require('../../savagex/toggles.json')
const messages = require('../../savagex/messages.json')

module.exports.run = (client, message, args) => {
    if (toggles.moderation.unmute !== true) return message.channel.send(':x: Command Disabled')

    message.channel.send(message.guild.name)
}

module.exports.config = {
    command: 'unmute',
    aliases: []
}