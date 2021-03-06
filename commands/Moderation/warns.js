const config = require("../../config.json")
const Discord = require("discord.js")
const conf = require('../../config.json')
const db = require(`quick.db`)
const discord = require(`discord.js`)

exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();

    if(!user) return message.channel.send(`Mention the user!`)
    
    let warnings = db.get(`warning_${message.guild.id}_${user.id}`)

    if(warnings === null) warnings = 0;
    let latest = db.get(`latestwarn.${user.id}`);
    if (latest === undefined) latest = 'No latest warn.'

    const embed = new discord.MessageEmbed()
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${user} have \`${warnings}\` warning(s)\nLatest warning reason: ${latest}`)
    .setTimestamp()
    .setColor("RANDOM")

    message.channel.send(embed).catch(() => message.channel.send("Something wrong.. try again."));
}

exports.help = {
    name: "warns",
    description: "see how many warnings that mentioned user have.",
    usage: [`${config.prefix}warns <Mentioned user>`],
    example: [`${config.prefix}warns Greblue`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}