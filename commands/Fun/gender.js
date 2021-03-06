const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const lol = ["male", "female"]
    const random = lol[Math.floor(Math.random() * lol.length)];

    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Real Gender System!`, member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`<@${member.user.id}> real gender is **${random}**`)
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    
    message.channel.send(embed);
}

exports.help = {
    name: "gender",
    description: "Let everyone know your real gender.",
    usage: [`${config.prefix}gender [Mentioned user]`],
    example: [`${config.prefix}gender @Greblue`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}