const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Click here.')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=716278759019511871&permissions=403172470&scope=bot')
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setColor('RANDOM')
    .setTimestamp()

    message.channel.send(embed)
}

exports.help = {
    name: "invite",
    description: `Invite me to your server!`,
    usage: [`${config.prefix}invite`],
    example: [`${config.prefix}invite`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}