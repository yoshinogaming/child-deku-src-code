const config = require("../../config.json")
const Discord = require("discord.js")
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
    const color = ["black", "blue", "brown", "cyan", "darkgreen", "lime", "orange", "pink", "purple", "red", "white", "yellow"]
    const random = color[Math.floor(Math.random() * color.length)];

    const tf = ["true", "false"]
    const randm = tf[Math.floor(Math.random() * tf.length)];

    let member = message.mentions.users.first() || message.author;

    const data = await fetch(`https://vacefron.nl/api//ejected?name=${member.username}&impostor=${randm}&crewmate=${random}`) 
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`Oh no.. ${member.username} got ejected!`)
    .setImage(`${data.url}`)
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    
    message.channel.send(embed);
}

exports.help = {
    name: "eject",
    description: "Eject someone you hate! (Among Us)",
    usage: [`${config.prefix}eject [Mentioned user]`],
    example: [`${config.prefix}eject @Greblue`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}