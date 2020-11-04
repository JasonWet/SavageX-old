const Discord = module.require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send('SUGGEST')
}

module.exports.config = {
    command: 'suggest',
    aliases: []
}