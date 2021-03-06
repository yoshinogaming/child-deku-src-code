const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    let m = require('moment-duration-format'),
    os = require('os'),
    cpuStat = require('cpu-stat'),
    ms = require('ms'),
    moment = require('moment'),
    fetch = require('node-fetch')

    cpuStat.usagePercent(function (error, percent, seconds) {
        if (error) {
          return console.error(error)
        }

    const cores = os.cpus().length
    const cpuModel = os.cpus()[0].model      
    const guild = client.guilds.cache.size.toLocaleString()
    const user = client.users.cache.size.toLocaleString()
    const channel = client.channels.cache.size.toLocaleString()
    const usage = formatBytes(process.memoryUsage().heapUsed)
    const Node = process.version
    const CPU = percent.toFixed(2)

const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.user.username} Information`, client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setThumbnail(client.user.displayAvatarURL({size: 2048}))
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .addFields(
        {name: '**Client Info**', value: `Name: ${client.user.tag}\nPrefix: ${config.prefix}\nLibrary: discord.js 12.5.1\nCreated since: May 30, 2020`},
        {name: `**Client Statistics**`, value: `Server: ${guild}\nChannels: ${channel}\nUsage: ${usage}\nNode: ${Node}\nCPU Usage: ${CPU}%\nUptime: ${parseDur(client.uptime)}`}
    )
    .setTimestamp()

    message.channel.send(embed);
    })
}

exports.help = {
    name: "client-info",
    description: "Let you know the information of Saturn Client",
    usage: [`${config.prefix}client-info`],
    example: [`${config.prefix}client-info`]
}
  
  exports.conf = {
    aliases: ["c-i"],
    cooldown: 1
}

function formatBytes (a, b) {
    if (0 == a) return "0 Bytes";
    let c = 1024,
        d = b || 2,
        e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
  }
  
  function formatBytes (a, b) {
    if (0 == a) return "0 Bytes";
    let c = 1024,
        d = b || 2,
        e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
  }
  
  function parseDur(ms) {
    let seconds = ms / 1000,
        days = parseInt(seconds / 86400);
    seconds = seconds % 86400
    
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600
    
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60)
    
    if (days) {
      return `${days} days, ${hours} hours, ${minutes} minutes`
    } else if (hours) {
      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
    } else if (minutes) {
      return `${minutes} minutes, ${seconds} seconds`
    }
    
    return `${seconds} seconds`
  }