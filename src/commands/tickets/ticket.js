const Discord = module.require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send('TICKET')
}

module.exports.config = {
    command: 'ticket',
    aliases: []
}