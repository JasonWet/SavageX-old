const Discord = module.require('discord.js');

module.exports.run = (client, message, args) => {
    let embed = new Discord.MessageEmbed()
        .setURL('discord.gg/savagelabs')
    message.channel.send(embed)
}

module.exports.config = {
    command: 'savage',
    aliases: []
}