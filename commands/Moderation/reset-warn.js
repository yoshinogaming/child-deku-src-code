const config = require("../../config.json")
const Discord = require("discord.js")
const conf = require('../../config.json')
const db = require(`quick.db`)
const discord = require(`discord.js`)

exports.run = async (client, message, args) => {   
    if (!message.member.hasPermission("MANAGE_GUILD", "ADMINISTRATOR")) return message.channel.send(`Hello ${message.author}, you need **Manage Server** permission to run this command!`);

    let user = message.mentions.users.first();
    if(!user) {
        return message.channel.send(`Mention the user!`)
        }
        
    let warnings = db.get(`warning_${message.guild.id}_${user.id}`)

    const well2 = new Discord.MessageEmbed()
    .setDescription(`${user} does'nt have any warn!`)

if(warnings === null) {
    return message.channel.send(well2)
    }

    const embed = new discord.MessageEmbed()
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${user} warning(s) has been successfully reseted!`)
    .setTimestamp()
    .setColor("GREEN")

    db.delete(`warning_${message.guild.id}_${user.id}`)
    db.delete(`latestwarn.${user.id}`);
    message.channel.send(embed).catch(() => message.channel.send("Something wrong.. try again."))
    user.send(`Your warning(s) has been reseted by ${message.author.tag} from ${message.guild.name}`)

}

exports.help = {
    name: "reset-warn",
    description: "Reset mentioned user warning",
    usage: [`${config.prefix}reset-warn <Mentioned user>`],
    example: [`${config.prefix}reset-warn Greblue`]
}
  
  exports.conf = {
    aliases: ["r-w"],
    cooldown: 1
}