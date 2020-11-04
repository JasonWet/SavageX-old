const Discord = module.require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send('CLOSE')
}

module.exports.config = {
    command: 'close',
    aliases: []
}