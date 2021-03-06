const Discord = require('discord.js');
const config = require('../../config.json');

const canvacord = require('canvacord');

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first();
  const Avatar = message.guild.member(user) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(" ") || x.user.username === args[0]) || message.author;

  
  let avatar = Avatar.displayAvatarURL({ format: 'png' });
  let image = await canvacord.Canvas.trigger(avatar);
  let attachment = new Discord.MessageAttachment(image, "Triggered.gif");
  message.channel.send(attachment);

}

exports.help = {
    name: "triggered",
    description: "Trigger someone!",
    usage: [`${config.prefix}triggered`],
    example: [`${config.prefix}triggered`]
}
  
  exports.conf = {
    aliases: ["trigger"],
    cooldown: 1
}
