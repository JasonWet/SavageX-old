const Discord = module.require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send('TOPIC')
}

module.exports.config = {
    command: 'topic',
    aliases: []
}