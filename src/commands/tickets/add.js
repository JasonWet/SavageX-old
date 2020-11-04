const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.tickets.add !== true) return message.channel.send(':x: Command Disabled');

    let id = args[0];

    let mentioned = message.mentions.members.first() || message.guild.members.cache.get(id);
    if (!mentioned) return message.channel.send(':x: You must specify a user')

    if (message.channel.parent.id !== conf.categories.ticketCategory) return message.channel.send(':x: You can only use this command in a ticket channel')

    message.channel.updateOverwrite(mentioned.id, {
        "SEND_MESSAGES": true,
        "VIEW_CHANNEL": true,
        "READ_MESSAGE_HISTORY": true
    }).then(() => {
        message.channel.send(mentioned + 'has been added to `' + message.channel.name + '` by ' + message.author)
    })
}

module.exports.config = {
    command: 'add',
    aliases: []
}