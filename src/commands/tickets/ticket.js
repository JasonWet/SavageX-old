const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.tickets.ticket !== true) return message.channel.send(':x: Command Disabled');

    message.guild.channels.create(`${message.user.name}-${message.user.discriminator}`, {
        type: "text",
        parent: conf.categories.ticketCategory,
        permissionOverwrites: [
            {
                id: message.author.id,
                allow: [
                    "SEND_MESSAGES",
                    "VIEW_CHANNEL"
                ],
            },
            {
                id: conf.roles.supportRole,
                allow: [
                    "SEND_MESSAGES",
                    "VIEW_CHANNEL"
                ]
            },
            {
                id: message.guild.id,
                deny: [
                    "SEND_MESSAGES",
                    "VIEW_CHANNEL"
                ]
            }
        ]
    }).then((channel) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`New Ticket`)
            .setColor(conf.embedColor)
            .setDescription(conf.messages.newTicketMessage)
            .setTimestamp()
            .setFooter(message.guild.name + " Support", message.guild.iconURL());
        channel.send(message.author, embed).then((msg) => {
            let embed = new Discord.MessageEmbed()
                .setDescription(`[Click me to view your ticket](${msg.url})`)
                .setColor(conf.embedColor)
            message.channel.send(`Ticket Created!`)
            message.channel.send(message.author, embed).then((msg) => {
                msg.delete({timeout: 3000})
                    .catch((e) => {
                        console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
                        console.log(e.stack)
                        console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
                    });
            })
        })
    })
}

module.exports.config = {
    command: 'ticket',
    aliases: ['new']
}