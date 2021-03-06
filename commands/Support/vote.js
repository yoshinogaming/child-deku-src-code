const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Click here.')
    .setURL('https://top.gg/bot/716278759019511871/vote')
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setColor('RANDOM')
    .setTimestamp()

    message.channel.send(embed)
}

exports.help = {
    name: "vote",
    description: `Vote Saturn Proxy for some cookies!`,
    usage: [`${config.prefix}vote`],
    example: [`${config.prefix}vote`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}