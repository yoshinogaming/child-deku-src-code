const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const random = Math.floor(Math.random() * 101);

    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Luck rate`)
    .setDescription(`${member.user.tag} are **${random}% lucky**`)
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
}

exports.help = {
    name: "how-luck",
    description: "How lucky are you?",
    usage: [`${config.prefix}how-luck [Mentioned user]`],
    example: [`${config.prefix}how-luck @Greblue`]
}
  
  exports.conf = {
    aliases: ["h-l"],
    cooldown: 1
}