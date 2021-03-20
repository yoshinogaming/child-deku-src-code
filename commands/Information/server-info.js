const config = require("../../config.json")
const Discord = require("discord.js")
const dateformat = require('dateformat');
const moment = require('moment');

exports.run = async (client, message, args) => {
    let icon = message.guild.iconURL({size: 2048}); // Server Avatar
    
    let region = {
      "brazil": "Brazil",
      "eu-central": "Central Europe",
      "singapore": "Singapore",
      "london": "London",
      "russia": "Russia",
      "japan": "Japan",
      "hongkong": "Hongkong",
      "sydney": "Sydney",
      "us-central": "U.S. Central",
      "us-east": "U.S East",
      "us-south": "U.S South",
      "us-west": "U.S West",
      "eu-west": "Western Europe"
    }
    
    // Channels
    let channels = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size,
        vc = channels.cache.filter(r => r.type === "voice").size,
        category = channels.cache.filter(r => r.type === "category").size,
        totalchan = channels.cache.size;
    
    // Region
    let location = region[message.guild.region];
    
    // Date
    let x = Date.now() - message.guild.createdAt;
    let h = Math.floor(x / 86400000) // 86400000, 5 digits-zero.
    let created = dateformat(message.guild.createdAt); // Install "dateformat" first.
    let test = moment.utc(message.guild.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
    
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .setAuthor(message.guild.name, icon)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setThumbnail(icon)
    .addField("Server owner", `${message.guild.owner.user.tag}\n(${message.guild.owner.user.id})`, true)
    .addField("Server region", location, true)
    .addField("Server ID", message.guild.id, true)
    .addField("Server created since", `${test} \n> ${h} Day(s) ago`, true)
//    .addField(`Server members (Total: [${total}])`, `Do Not Disturb: ${dnd} \nIdle: ${idle} \nOnline: ${online} \nOffline: ${offline} \nBots: ${robot}`, true)   message.channel.send(embed); // Let's see if it's working!
}

exports.help = {
    name: "server-info",
    description: "Let you know the information of this server.",
    usage: [`${config.prefix}server-info`],
    example: [`${config.prefix}server-info`]
}
  
  exports.conf = {
    aliases: ["s-i"],
    cooldown: 1
}