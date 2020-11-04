const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = async (client, message, args) => {
    if (conf.toggles.moderation.unmute !== true) return message.channel.send(':x: Command Disabled')

    let id = args[0];

    let mentioned = message.mentions.members.first() || message.guild.members.cache.get(id);

    let muted = message.guild.roles.cache.get(conf.roles.mutedRole);
    if (muted === undefined) return console.log(`${message.guild.name} - Muted Role not set...` && `${message.guild.name} - Join discord.gg/savagelabs for support`)

    if (!mentioned) return message.channel.send(":x: You must specify a user");

    if (mentioned.roles.cache.has(conf.roles.mutedRole)) return message.channel.send(":x: User is not muted")

    let channel = message.guild.channels.cache.get(conf.channels.muteLogsChannel);
    if (channel === undefined) return console.log(`${message.guild.name} - Muted Logs Channel not set...` && `${message.guild.name} - Join discord.gg/savagelabs for support`)

    await mentioned.roles.remove(muted);

    let embed = new Discord.MessageEmbed()
        .setTitle(`UNMUTED`)
        .setColor("3D98D4")
        .addField("Unmuted User", `${mentioned} - ${mentioned.user.tag} - ${mentioned.id}`)
        .addField("Unmuted By", `<@${message.author.id}> - ${message.author.tag} - ${message.author.id}`)
        .addField("Unmuted In", message.channel)
        .addField("Time", `${message.createdAt}`)
        .setFooter(message.guild.name, message.author.avatarURL());
    console.log(`${message.guild.name} - ${message.author.tag} unmuted ${mentioned.user.tag}`)
    message.channel.send(mentioned, embed)
    channel.send(embed)
}

module.exports.config = {
    command: 'unmute',
    aliases: []
}