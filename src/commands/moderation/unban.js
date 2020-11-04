const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = async (client, message, args) => {
    if (conf.toggles.moderation.unban !== true) return message.channel.send(':x: Command Disabled')

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":x: Insufficient Permission")

    let id = args[0];

    if (!id) return message.channel.send(":x: You must specify a user")

    if (message.guild.members.cache.get(id)) return message.channel.send(":x: User is not banned")

    let channel = message.guild.channels.cache.get(conf.channels.banLogsChannel)
    if (channel === undefined) return console.log(`${message.guild.name} - Ban Logs Channel not set...` && `${message.guild.name} - Join discord.gg/savagelabs for support`)
    await message.guild.members.unban(`${args[0]}`).then(() => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`UNBANNED`)
            .setColor(`${conf.embedColor}`)
            .addField("Unbanned ID", `${args[0]}`)
            .addField("Unbanned By", `<@${message.author.id}> - ${message.author.tag} - ${message.author.id}`)
            .addField("Unbanned In", message.channel)
            .addField("Time", `${message.createdAt}`)
            .setFooter(message.guild.name, message.author.avatarURL());
        console.log(`${message.guild.name} - ${message.author.tag} unbanned ${args[0]}`)
        message.channel.send(embed)
        channel.send(embed)
    })
}

module.exports.config = {
    command: 'unban',
    aliases: []
}