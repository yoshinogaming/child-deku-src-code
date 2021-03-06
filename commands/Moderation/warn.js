const config = require("../../config.json")
const Discord = require("discord.js")
const conf = require('../../config.json')
const db = require(`quick.db`)
const discord = require(`discord.js`)

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD", "ADMINISTRATOR")) return message.channel.send(`Hello ${message.author}, you need **Manage Server** permission to run this command!`);

    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");
      let prefix = conf.prefix;
      let args1 = message.content.slice(prefix.length).trim().split(/ +/g);
      let reason1 = args1.slice(2).join(" ");
      let user = message.mentions.users.first();

      if (!user) return message.channel.send(`Mention the user!`);
      
      let warnings = db.get(`warn_${message.guild.id}_${user.id}`)

      if (user.id === client.user.id) return message.channel.send(`You can't warn a bot!`);

      if (user.id === message.author.id) return message.channel.send(`You can't warn yourself!`);

      if (!reason1) return message.channel.send("Try again with the reason!");
    
      const embed = new discord.MessageEmbed()
      .setFooter(message.guild.name, message.guild.iconURL({size: 2048}))
      .setTitle('You got warned!')
      .setDescription(`Moderator: ${message.author.tag}\nReason: ${reason1}`)
      .setColor("RED")
      .setTimestamp()//Simple LOLOLOLOL

      if(warnings === null) {
        db.add(`warning_${message.guild.id}_${user.id}`, 1)
        db.set(`latestwarn.${user.id}`, reason1)
        const well4 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${user.tag} has been warned!\nReason: ${reason1}`)
        user.send(embed).then(() => message.channel.send(well4)).catch(() => message.channel.send("Something wrong.. try again."));
      }
}

exports.help = {
    name: "warn",
    description: "warn the rules breaker!",
    usage: [`${config.prefix}warn <Mentioned user> [Reason]`],
    example: [`${config.prefix}warn Greblue Spamming!`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}