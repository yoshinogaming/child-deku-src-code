const config = require("../../config.json")
const Discord = require("discord.js")
const c = require("../../config.json")

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_NICKNAMES", "ADMINISTRATOR")) return message.channel.send(`Hello ${message.author}, you need **Manage Nicknames** permission to run this command!`);
  
    let prefix = c.prefix;
    let args1 = message.content.slice(prefix.length).trim().split(/ +/g);
  
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

    if (!user) return message.channel.send(`Mention the user!`);
    
    let nick = args1.slice(2).join(" ");
    if (!nick) return message.channel.send(`Please enter a name for the user!`);
    
    let member = message.guild.members.cache.get(user.id);
    
    await member.setNickname(nick).then(() => {
      const well3 = new Discord.MessageEmbed()
      .setTitle("Successfuly change nickname!")
      .setDescription(`Nickname of **${user.tag}** has been changed to **${nick}**.`)
      return message.channel.send(`Nickname of **${user.tag} has been changed to **${nick}**`);
    }).catch(err => {
      return message.channel.send(`Failed to change nickname for **${user.tag}**`);
    });
}

exports.help = {
    name: "set-nickname",
    description: "set a nickname for a user",
    usage: [`${config.prefix}set-nickname <Mentioned member> [Nickname]`],
    example: [`${config.prefix}set-nickname @Greblue`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}