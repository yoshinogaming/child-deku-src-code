const config = require("../../config.json")
const Discord = require("discord.js")
const fetch = require("node-superfetch");

exports.run = async (client, message, args) => {
    let args2 = message.content.split(" ").slice(1);
    const name = args2.join(" ");
      if (!name) return message.channel.send(`Try again with the channel name!`);
  
      const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${config.google}&maxResults=1&type=channel`)
      .catch(() => message.channel.send("Unknown channel. Pls try again.."));
  
      if (!channel.body.items[0]) return message.channel.send("No channel result. Try again.");
  
      const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${config.google}`)
      .catch(() => message.channel.send("Unknown channel data error. Pls try again.."));
  
      const embed = new Discord.MessageEmbed()
      .setAuthor(channel.body.items[0].snippet.channelTitle)
      .setColor("RANDOM")
      .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
      .setTimestamp(new Date())
      .setDescription(`> Link: [${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`)
      .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .addField(`Channel Information`, `Name: ${channel.body.items[0].snippet.channelTitle}\nDescription: ${channel.body.items[0].snippet.description}\nSubscribers count: ${parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString()}\nTotal views: ${parseInt(data.body.items[0].statistics.viewCount).toLocaleString()}\nTotal videos: ${parseInt(data.body.items[0].statistics.videoCount).toLocaleString()}\nChannel date created: ${new Date(channel.body.items[0].snippet.publishedAt).toDateString()}`)

      return message.channel.send(embed);
}

exports.help = {
    name: "youtube",
    description: "See some youtube channel!",
    usage: [`${config.prefix}youtube <Channel name>`],
    example: [`${config.prefix}youtube Dream`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}