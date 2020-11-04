const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {

    function closeTicket() {
        message.channel.delete("Ticket Closed")
            .catch((e) => {
                console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
                console.log(e.stack)
                console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
            });
    }

    if (message.channel.parent.id !== conf.categories.ticketCategory) return message.channel.send(':x: You can only use this command in a ticket channel')

    console.log(`${message.guild.name} - Ticket closure process started` && `${message.guild.name} - Join discord.gg/savagelabs for support`)
    message.channel.send('Please reply with `confirm` or `deny` to confirm or deny ticket closure').then((msg) => {
        const filter = (response) => {
            return response;
        };
        msg.channel.awaitMessages(filter, {max: 1, time: 900000, errors: ['time']})
            .then(async (collected) => {
                let collection = collected.first().content;
                if (collection === 'confirm') {
                    message.channel.send('Ticket closure confirmed!')
                    message.channel.send("Ticket will be closed in 5 seconds");
                    function ticketClosed() {
                        message.channel.delete("Ticket Closed")
                            .catch((e) => {
                                console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
                                console.log(e.stack)
                                console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
                            });
                    }
                    setTimeout(ticketClosed, 5000);
                } else if (collection === 'deny') {
                    message.channel.send('Ticket closure denied!')
                } else {
                    message.channel.send('Please reply with `confirm` or `deny` to confirm or deny ticket closure')
                }
            })
    })
}

module.exports.config = {
    command: 'close',
    aliases: []
}