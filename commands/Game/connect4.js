const Discord = require('discord.js')
const config = require('../../config.json')

exports.run = async (client, message, args) => {
    const GameCord = require('gamecord-fork')
//  if(!args) return message.channel.send("How many minutes do you want to play?\n```Example: game!snake 1```")
  new GameCord.djs.ConnectFour(message)
  .run()

  message.channel.send()
}

exports.help = {
  name: "connect4",
  description: "Play connect4 game with your friend on discord.",
  usage: [`${config.prefix}connect4`],
  example: [`${config.prefix}connect4`]
}

exports.conf = {
  aliases: ["c-4"],
  cooldown: 1
}