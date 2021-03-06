const config = require("../../config.json")
const Discord = require("discord.js")
const c = require("../../config.json")

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_NICKNAMES", "ADMINISTRATOR")) return message.reply(`Hello ${message.author}, you need **Manage Nicknames** permission to run this command!`);
  
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

    if (!user) return message.channel.send(`Mention the user!`);
    
    let member = message.guild.members.cache.get(user.id);
    
    await member.setNickname(null).then(() => {
      return message.channel.send(`Nickname of **${user.tag}** has been reseted!`);
    }).catch(err => {
      return message.channel.send(`Failed to reset **${user.tag}** nickname..`);
    });
}

exports.help = {
    name: "reset-nickname",
    description: "reset a nickname for a user.",
    usage: [`${config.prefix}reset-nickname <Mentioned member>`],
    example: [`${config.prefix}reset-nickname @Greblue`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}