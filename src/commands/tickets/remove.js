const Discord = module.require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send('REMOVE')
}

module.exports.config = {
    command: 'remove',
    aliases: []
}