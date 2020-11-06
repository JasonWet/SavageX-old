const { client } = require('../index');
const Discord = require('discord.js');
const conf = require('../conf.json');

client.on(`guildMemberAdd`, async member => {
    if (conf.toggles.JoinLeave.joinLogs !== true) return;

    let channel = member.guild.channels.cache.get(conf.channels.joinLogsChannel);
    if (!channel) return console.log(`${member.guild.name} - Join Logs Channel not set...` && `${member.guild.name} - Join discord.gg/savagelabs for support`)

    const embed = new Discord.MessageEmbed()
        .setTitle(`Join (${member.guild.memberCount})`)
        .setColor(`${conf.successEmbedColor}`)
        .setDescription(`${member.user} / ${member.user.tag} / ${member.user.id} joined`)
        .setFooter(member.guild.name, member.user.avatarURL())
        .setTimestamp();
    channel.send(embed);
    let role = member.guild.roles.cache.get(conf.roles.joinRole);
    if (role !== undefined) {
        await member.roles.add(conf.roles.joinRole)
    }
    if (conf.toggles.JoinLeave.memberCount === true) {
        let channel = member.guild.channels.cache.get(conf.channels.memberCountChannel);
        if (!channel) return console.log(`${member.guild.name} - Member Count Channel not set...` && `${member.guild.name} - Join discord.gg/savagelabs for support`)
        await channel.setName(conf.messages.memberCountMessage + ` ` + member.guild.memberCount)
    }
});