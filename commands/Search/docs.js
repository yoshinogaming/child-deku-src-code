const Discord = require("discord.js")
const fetch = require("node-fetch").default;
const config = require("../../config.json");

exports.run = async(client, message, args) => {
  let [query, branch] = args;

  if (!query) return message.channel.send({embed: {description: "Please include a search query!"}});
  if (!branch) branch = "stable";

  fetch(`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(json => {
          if (!json) return message.channel.send({embed: {description: "Didn't fount what you want to search for."}});

          message.channel.send({ embed: json });
      })
      .catch(() => {
          message.channel.send({embed: {description:  "Couldn't fetch docs."}});
      })
}

exports.help = {
    name: "docs",
    description: "Discord.js (stable) docs",
    usage: `${config.prefix}docs <text>`,
    example: `${config.prefix}docs embed`
  }
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
  }