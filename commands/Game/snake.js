const Discord = require('discord.js')
const config = require('../../config.json')

exports.run = async (client, message, args) => {
    const GameCord = require('gamecord-fork')
//  if(!args) return message.channel.send("How many minutes do you want to play?\n```Example: game!snake 1```")
  new GameCord.djs.SnakeGame(message)
  .run()

  message.channel.send()
}

exports.help = {
  name: "snake",
  description: "Play snake game on discord.",
  usage: [`${config.prefix}snake`],
  example: [`${config.prefix}snake`]
}

exports.conf = {
  aliases: [],
  cooldown: 1
}