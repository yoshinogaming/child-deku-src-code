const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    try {
        const m = await message.channel.send("Here.."); // Make sure the async is written, top of the client.on("message", ...)
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM") // Tired of choosing the embed colors? Just type "RANDOM" on it!
        .addField("⌛ Latency", `**${m.createdTimestamp -  message.createdTimestamp}ms**`)
        .addField("💓 API", `**${Math.floor(client.ws.ping)}ms**`) // Use "client.ping" if your Discord.js is < 1.15.1 --- Use "client.ws.ping" if your Discord.js is > 12.0.0
        return message.channel.send(embed);
      } catch (error) {
        return message.channel.send(`Something went wrong: ${error.message}`);
        // Restart the bot as usual.
      }
}

exports.help = {
    name: "ping",
    description: "Showing you the bot ping 😁",
    usage: [`${config.prefix}ping`],
    example: [`${config.prefix}ping`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}