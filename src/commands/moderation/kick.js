const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":x: Insufficient Permission")

    let id = args[0];

    let mentioned = message.mentions.members.first() || message.guild.members.cache.get(id);

    if (!mentioned) return message.channel.send(":x: You must specify a user")

    let reason;
    if (!args[1]) return message.channel.send(":x: You must provide a reason")

    if (message.mentions.members.first()) {
        reason = args.join(" ").slice(22);
    } else if (message.guild.members.cache.get(id)) {
        reason = args.join(" ").slice(18);
    }

    let channel = message.guild.channels.cache.get(conf.channels.banLogsChannel)
    if (channel === undefined) return console.log(`${message.guild.name} - Kick Logs Channel not set...` && `${message.guild.name} - Join discord.gg/savagelabs for support`)
    await mentioned.kick(`You have been kicked from ${message.guild.name} by ${message.author.tag} for ${reason}`).then(() => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`KICKED`)
            .setColor(conf.embedColor)
            .addField("Kicked User", `${mentioned} / ${mentioned.user.tag} / ${mentioned.id}`)
            .addField("Kicked By", `<@${message.author.id}> / ${message.author.tag} / ${message.author.id}`)
            .addField("Kicked In", message.channel)
            .addField("Time", `${message.createdAt}`)
            .addField("Reason", `${reason}`)
            .setFooter(message.guild.name, message.author.avatarURL());
        console.log(`${message.guild.name} - ${message.author.tag} kicked ${mentioned.user.tag} for ${reason}`)
        message.channel.send(embed)
        channel.send(embed)
    })
}

module.exports.config = {
    command: 'kick',
    aliases: []
}