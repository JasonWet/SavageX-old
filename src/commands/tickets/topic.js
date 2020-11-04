const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.tickets.topic !== true) return message.channel.send(':x: Command Disabled');

    if (message.channel.parent.id !== conf.categories.ticketCategory) return message.channel.send(':x: You can only use this command in a ticket channel')

    if (!args) return message.channel.send(':x: You must provide a topic')

    let topic = args.join(" ");

    message.channel.setTopic(`${topic}`)
        .catch((e) => {
            console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
            console.log(e.stack)
            console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
        })
        .then(() => {
        message.channel.send(message.author + 'has set the topic to `' + topic + '`')
    })
}

module.exports.config = {
    command: 'topic',
    aliases: []
}