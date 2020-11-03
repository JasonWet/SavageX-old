const Discord = module.require('discord.js');
const info = require('../../../package.json')

module.exports.run = (client, message, args) => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`About`)
        .addField(`Project Name:`, info.name)
        .addField(`Project Version:`, info.version)
        .addField(`Project Authors:`, info.author)
        .setDescription(info.description)
}

module.exports.config = {
    command: 'about',
    aliases: []
}