const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = async (client, message, args) => {
    if (conf.toggles.moderation.mute !== true) return message.channel.send(':x: Command Disabled')

    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(":x: Insufficient Permission")

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

    let muted = message.guild.roles.cache.get(conf.roles.mutedRole);
    if (muted === undefined) return console.log(`${message.guild.name} - Muted Role not set...` && `${message.guild.name} - Join discord.gg/savagelabs for support`)

    let channel = message.guild.channels.cache.get(conf.channels.muteLogsChannel);
    if (channel === undefined) return console.log(`${message.guild.name} - Muted Logs Channel not set...` && `${message.guild.name} - Join discord.gg/savagelabs for support`)

    await mentioned.roles.add(muted).then(() => {
        let embed = new Discord.MessageEmbed()
            .setTitle(`MUTED`)
            .setColor("3D98D4")
            .addField("Muted User", `${mentioned} - ${mentioned.user.tag} - ${mentioned.id}`)
            .addField("Muted By", `<@${message.author.id}> - ${message.author.tag} - ${message.author.id}`)
            .addField("Muted In", message.channel)
            .addField("Time", `${message.createdAt}`)
            .addField("Reason", `${reason}`)
            .setFooter(message.guild.name, message.author.avatarURL());
        console.log(`${message.guild.name} - ${message.author.tag} muted ${mentioned.user.tag} for ${reason}`)
        message.channel.send(mentioned, embed)
        channel.send(embed)
    })

}

module.exports.config = {
    command: 'mute',
    aliases: []
}