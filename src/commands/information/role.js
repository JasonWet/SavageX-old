const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.information.role !== true) return message.channel.send(':x: Command Disabled')

    let id = args[0];

    let mentioned = message.mentions.roles.first() || message.guild.roles.cache.get(id);

    if (!mentioned) return message.channel.send(':x: You must specify a role')

    let embed = new Discord.MessageEmbed()
        .setTitle(`Role Information`)
        .setColor(`${conf.embedColor}`)
        .addField(`Mention / Name / ID`, mentioned + ' / ' + mentioned.name + ' / ' + mentioned.id)
        .addField(`Position`, mentioned.position)
        .addField(`Created At`, mentioned.createdAt)
        .addField(`Permissions`, '')
        .setTimestamp()
        .setFooter(message.guild.name + ' - ' + message.author.tag, message.author.avatarURL())
    message.channel.send(message.author, embed)
}

module.exports.config = {
    command: 'role',
    aliases: []
}