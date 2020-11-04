const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.information.user !== true) return message.channel.send(':x: Command Disabled')

    let id = args[0]

    let mentioned = message.mentions.members.first() || message.guild.members.cache.get(id)

    if (mentioned) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`User Information`)
            .setColor(`${conf.embedColor}`)
            .addField(`Mention / Tag / ID`, mentioned.member + ' / ' + mentioned.member.tag + ' / ' + mentioned.member.id)
            .addField(`Joined At`, mentioned.member.joinedAt)
            .addField(`Created At`, mentioned.member.createdAt)
            .addField(`Roles`, '')
            .setTimestamp()
            .setFooter(message.guild.name + ' - ' + message.author.tag, message.author.avatarURL())
        message.channel.send(message.author, embed)
    } else {
        let embed = new Discord.MessageEmbed()
            .setTitle(`User Information`)
            .setColor(`${conf.embedColor}`)
            .addField(`Mention / Tag / ID`, message.author + ' / ' + message.author.tag + ' / ' + message.author.id)
            .addField(`Joined At`, message.member.joinedAt)
            .addField(`Created At`, message.member.createdAt)
            .addField(`Roles`, '')
            .setTimestamp()
            .setFooter(message.guild.name + ' - ' + message.author.tag, message.author.avatarURL())
        message.channel.send(message.author, embed)
    }
    message.channel.send(message.guild.name)
}

module.exports.config = {
    command: 'user',
    aliases: []
}