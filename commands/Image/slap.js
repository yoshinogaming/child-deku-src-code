const Discord = require('discord.js');
const config = require('../../config.json');

const canvacord = require('canvacord');

exports.run = async (client, message, args) => {
  let image1 = message.author.displayAvatarURL({ format: 'png' })
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(" ") || x.user.username === args[0]);

  if (!user) return message.channel.send("Mention the user!")
  let image2 = user.displayAvatarURL({ format: 'png' })

  let image = await canvacord.Canvas.slap(image1, image2);
  let attachment = new Discord.MessageAttachment(image, "Slap.png"); 
  message.channel.send(attachment);

}

exports.help = {
    name: "slap",
    description: "Slap someone!",
    usage: [`${config.prefix}slap <Mentioned user>`],
    example: [`${config.prefix}slap @Greblue`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}
