const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.information.channel !== true) return message.channel.send(':x: Command Disabled')

    let id = args[0];

    let mentioned = message.mentions.channels.first() || message.guild.channels.cache.get(id);

    if (!mentioned) return message.channel.send(':x: You must specify a channel')

    let embed = new Discord.MessageEmbed()
        .setTitle(`Channel Information`)
        .setColor(`${conf.embedColor}`)
        .addField(`Mention / Name / ID`, mentioned + ' / ' + mentioned.name + ' / ' + mentioned.id)
        .addField(`Parent Name / Parent ID`, mentioned.parent.name + ' / ' + mentioned.parent.id)
        .addField(`Type`, mentioned.type)
        .addField(`Created At`, mentioned.createdAt)
        .addField(`Permissions`, '')
        .setTimestamp()
        .setFooter(message.guild.name + ' - ' + message.author.tag, message.author.avatarURL())
    message.channel.send(message.author, embed)
}

module.exports.config = {
    command: 'channel',
    aliases: []
}