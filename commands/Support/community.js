const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Click here.')
    .setURL('https://discord.gg/rveCu4yZVq')
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setColor("RANDOM")
    .setTimestamp()

message.channel.send(embed);
}

exports.help = {
    name: "community",
    description: "Join our community!",
    usage: [`${config.prefix}community`],
    example: [`${config.prefix}community`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}