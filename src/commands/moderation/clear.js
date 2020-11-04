const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.moderation.clear !== true) return message.channel.send(':x: Command Disabled')

    message.delete({timeout: 5000})
        .catch(console.error);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Insufficient Permission").then((msg) => {msg.delete({timeout: 5000}).catch(console.error)});

    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
        return message.channel.send(':x: You must specify a valid number [1-99]').then((msg) => {msg.delete({timeout: 5000}).catch(console.error)});
    } else if (amount <= 1 || amount > 100) {
        return message.reply(':x: You must specify a valid number [1-99]').then((msg) => {msg.delete({timeout: 5000}).catch(console.error)});
    }

    message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
    }).then( () => {
        message.channel.send(`${message.author} has deleted **${amount-1}** message(s)`).then(async (msg) => {
            console.log(`${message.guild.name} - ${message.author.username} deleted ${amount-1} message(s)`)
            msg.delete({timeout: 5000})
                .catch(console.error)
        })
    })
}

module.exports.config = {
    command: 'clear',
    aliases: []
}