const config = require("../../config.json")
const Discord = require("discord.js")
const Kitsu = require("kitsu.js");
const kitsu = new Kitsu();
const c = require('../../config.json')

exports.run = async (client, message, args) => {
    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");
      let prefix = c.prefix;
      let args1 = message.content.slice(prefix.length).trim().split(/ +/g);
  
    if(!arg1) return message.channel.send(`Enter the name of anime you want to search!`);
    
    const search = arg1;
    
    kitsu.searchAnime(search).then(async result => {
      const anime = result[0];

      if (result.length === 0) return message.channel.send(`There is no result called **${search}**!`);
      
      const info = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${anime.titles.romaji ? anime.titles.romaji : "Unknown"}`)
      .setThumbnail(anime.posterImage.original)
      .addField(`**Synopsis**`, `${anime.synopsis.replace(/<[^>]*>/g, "").split("\n")[0]}`)
      .addField(`**Anime Information**`, `Japanese: ${anime.titles.japanese ? anime.titles.japanese : "Unknown"}\nEnglish: ${anime.titles.english ? anime.titles.english : "Unknown"}\nRating: ${anime.averageRating ? anime.averageRating : "Unknown"}/100\nStart date: ${anime.startDate ? anime.startDate : "Unknown"}\nEnd date: ${anime.endDate ? anime.endDate : "Unknown"}\nType: ${anime.showType ? anime.showType : "Unknown"}\nEpisodes: ${anime.episodeCount ? anime.episodeCount : "Unknown"}\nDuration: ${anime.episodeLength ? anime.episodeLength : "??"} minutes\nRank: ${anime.ratingRank ? anime.ratingRank : "Unknown"}`)
      .setTimestamp()
      .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      return message.channel.send(info);
    })
}

exports.help = {
    name: "anime",
    description: "Search your favorite anime!",
    usage: [`${config.prefix}anime <Anime name>`],
    example: [`${config.prefix}anime Fairy Tails`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}