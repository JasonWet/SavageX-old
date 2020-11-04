const Discord = module.require('discord.js');

module.exports.run = (client, message, args) => {
    message.channel.send('ADD')
}

module.exports.config = {
    command: 'add',
    aliases: []
}