const Discord = require('discord.js');
const config = require('../../config.json');

const canvacord = require('canvacord');

exports.run = async (client, message, args) => {
  let text = message.content.split(" ").slice(1).join(" ");
  if (!text) return message.channel.send("Try again with some message!")
  

  let image = await canvacord.Canvas.ohno(text);
  let attachment = new Discord.MessageAttachment(image, "Oh_no.png"); 
  message.channel.send(attachment);

}

exports.help = {
    name: "oh-no",
    description: "Oh no! its stupid!",
    usage: [`${config.prefix}ohno <Message>`],
    example: [`${config.prefix}ohno Im gay `]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}
