const Discord = module.require('discord.js');
const conf = require('../../conf.json')

module.exports.run = (client, message, args) => {
    if (conf.toggles.suggestions.suggest !== true) return message.channel.send(':x: Command Disabled');

    let channel = message.guild.channels.cache.get(conf.channels.suggestionChannel)
    if (channel === undefined) return console.log(`${message.guild.name} - Suggestion Channel not set...` && `${message.guild.name} - Join discord.gg/savagelabs for support`)

    let check = message.guild.emojis.cache.get(conf.emojis.checkEmoji)
    if (check === undefined) return console.log(`${message.guild.name} - Check Emoji not set...` && `${message.guild.name} - Join discord.gg/savagelabs for support`)
    let cross = message.guild.emojis.cache.get(conf.emojis.crossEmoji)
    if (cross === undefined) return console.log(`${message.guild.name} - Cross Emoji not set...` && `${message.guild.name} - Join discord.gg/savagelabs for support`)

    if (!args) return message.channel.send(':x: You must provide a description for your suggestion');

    let suggestion = args.join(" ");

    let embed = new Discord.MessageEmbed()
        .setTitle('Suggestion')
        .setColor(`${conf.embedColor}`)
        .setDescription('Suggested By: ' + message.author + ' (`' + message.author.tag + '`)')
        .addField(`Description`, suggestion)
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
    channel.send(embed).then(async (msg) => {
        await msg.react(check)
        await msg.react(cross)
        let embed = new Discord.MessageEmbed()
            .setDescription(`[Click me to view your suggestion](${msg.url})`)
            .setColor(`${conf.embedColor}`)
        message.channel.send(`Suggestion Submitted!`)
        message.channel.send(message.author, embed).then((msg) => {
            msg.delete({timeout: 3000})
                .catch((e) => {
                    console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
                    console.log(e.stack)
                    console.log(`${message.guild.name} - Join discord.gg/savagelabs for support`)
                });
        })
    })
}

module.exports.config = {
    command: 'suggest',
    aliases: []
}