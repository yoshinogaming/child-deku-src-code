const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");
    if(!arg1) return message.channel.send(`Please write your suggestion.`);

    user = config.owners;

    const embed = new Discord.MessageEmbed()
    .setTitle(`New Suggestion`)
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .addField(`Suggestion:`, arg1)
    .setDescription(`From: <@${message.author.id}>\nName: ${message.author.tag}\nUser ID: ${message.author.id}\nServer: ${message.guild.name}\nServer ID: ${message.guild.id}`)

    message.channel.send('Successfuly send your suggestion!').then(msg = client.channels.cache.find(x => x.id === "763688268457836576").send(embed));

}

exports.help = {
    name: "suggest",
    description: "Make a suggestion.",
    usage: [`${config.prefix}suggest [Message]`],
    example: [`${config.prefix}suggest Make the bot more better`]
}
  
  exports.conf = {
    aliases: ["suggest"],
    cooldown: 10
}