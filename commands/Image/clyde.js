const Discord = require('discord.js');
const config = require('../../config.json');

const canvacord = require('canvacord');

exports.run = async (client, message, args) => {
  let text = message.content.split(" ").slice(1).join(" ");
  if (!text) return message.channel.send("Try again with some message!")

  let image = await canvacord.Canvas.clyde(text);
  let attachment = new Discord.MessageAttachment(image, "Clyde.png");
  message.channel.send(attachment);

}

exports.help = {
    name: "clyde",
    description: "Clyde Bot",
    usage: [`${config.prefix}Clyde <Message>`],
    example: [`${config.prefix}Clyde Hello`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}
