const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    message.channel.send('TOPIC')
}

module.exports.config = {
    command: 'topic',
    aliases: []
}