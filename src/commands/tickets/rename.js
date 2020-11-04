const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.tickets.rename !== true) return message.channel.send(':x: Command Disabled');

    if (message.channel.parent.id !== conf.categories.ticketCategory) return message.channel.send(':x: You can only use this command in a ticket channel')

    if (!args[0]) return message.channel.send(':x: You must provide a new name')
    if (args[1]) return message.channel.send(':x: You must make the name 1 word')

    let name = args[0]
    message.channel.setName(`${name}`)
        .catch((e) => {
            console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
            console.log(e.stack)
            console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
        })
        .then(() => {
        message.channel.send(message.author + 'has changed the name to `' + name + '`')
    })
}

module.exports.config = {
    command: 'rename',
    aliases: []
}