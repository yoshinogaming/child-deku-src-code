const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send(`Hello ${message.author}, you need **Kick Members** permission to run this command!`)
    let user = message.mentions.users.first();

    let member = message.guild.member(user);

    if (!user) return message.channel.send("Mention the user!");
    if (user.id === message.author.id) return message.channel.send("You can't kick yourself!");
    if (user.id === client.user.id) return message.channel.send("You can't kick a bot");

    member.kick(user).then(() => {
        const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle("Successfully kicked!")
        .setDescription(`Moderator: ${message.author.tag}\nKicked: ${user.tag}`)
        .setColor("RANDOM")
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(embed)
    }).catch(err => {
        message.channel.send(`I was unable to ban the user.`);
    })
}


exports.help = {
    name: "kick",
    description: "Kick the fools!",
    usage: [`${config.prefix}kick <Mentioned member>`],
    example: [`${config.prefix}kick @Greblue`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}