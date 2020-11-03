const Discord = module.require('discord.js');
const info = require('../../../package.json')

module.exports.run = (client, message, args) => {
    message.channel.send(`Created by ${info.author}`)
}

module.exports.config = {
    command: 'credits',
    aliases: []
}