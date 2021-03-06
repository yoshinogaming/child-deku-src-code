const discord = require("discord.js");
const config = require('../../config.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    if(message.author.id !== config.owners){
        let prefix = config.prefix;
        let args1 = message.content.slice(prefix.length).trim().split(/ +/g);
        let reason = 'Try to use developer command';
        db.add(`warning_${message.guild.id}_${message.author.id}`, 1)
        db.set(`latestwarn.${user.id}`, reason)
        return message.channel.send(`Not so fast brudda, you are not my developer. And you got warned from me!`);
    }

    if(!args.length) {
        return message.channel.send("Please give status message")
      }
      
   client.user.setActivity(args.join(" "));

   message.channel.send("Updated the bot status")
}

exports.help = {
    name: "set-status",
    description: "Change the bot status.",
    usage: `${config.prefix}status [status]`,
    example: `${config.prefix}status Saturn Planet!`
}

exports.conf = {
    aliases: [],
    cooldown: 5
  }