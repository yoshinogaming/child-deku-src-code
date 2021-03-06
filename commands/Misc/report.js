const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");
    if(!arg1) return message.channel.send("Please write your report.");

    user = config.owners;

    const embed = new Discord.MessageEmbed()
    .setTitle(`New Report`)
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .addField(`Report:`, arg1)
    .setDescription(`From: <@${message.author.id}>\nName: ${message.author.tag}\nUser ID: ${message.author.id}\nServer: ${message.guild.name}\nServer ID: ${message.guild.id}`)

    message.channel.send('Successfuly send your report!').then(msg = client.channels.cache.find(x => x.id === "797730350582726676").send(embed));

}

exports.help = {
    name: "report",
    description: "Make a report.",
    usage: [`${config.prefix}report <Message>`],
    example: [`${config.prefix}report Some command doesnt work!`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}