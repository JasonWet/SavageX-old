const { client } = require('../index');
const Discord = require('discord.js');
const conf = require('../conf.json');

client.on(`guildMemberRemove`, async member => {
    if (conf.toggles.JoinLeave.leaveLogs !== true) return;

    let channel = member.guild.channels.cache.get(conf.channels.leaveLogsChannel);
    if (!channel) return console.log(`${member.guild.name} - Leave Logs Channel not set...` && `${member.guild.name} - Join discord.gg/savagelabs for support`)

    const embed = new Discord.MessageEmbed()
        .setTitle(`Leave (${member.guild.memberCount})`)
        .setColor(`${conf.successEmbedColor}`)
        .setDescription(`${member.user} / ${member.user.tag} / ${member.user.id} left`)
        .setFooter(member.guild.name, member.user.avatarURL())
        .setTimestamp();
    channel.send(embed);
    if (conf.toggles.JoinLeave.memberCount === true) {
        let channel = member.guild.channels.cache.get(conf.channels.memberCountChannel);
        if (!channel) return console.log(`${member.guild.name} - Member Count Channel not set...` && `${member.guild.name} - Join discord.gg/savagelabs for support`)
        await channel.setName(conf.messages.memberCountMessage + ` ` + member.guild.memberCount)
    }
});