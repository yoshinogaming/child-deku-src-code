const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    let args1 = message.content.split(" ");
    const args2 = args1.slice(1);
    let reason1 = args2.slice(1).join(" ");

    if (!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) return message.channel.send(`Hello ${message.author}, you need **Ban Members** permission to run this command!`);
    let user = message.mentions.users.first();

    let member = message.guild.member(user) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(" ") || x.user.username === args[0]);
    
    const DMs = new Discord.MessageEmbed()
    .setTimestamp()
    .setThumbnail(message.guild.iconURL())
    .setTitle("You got banned!")
    .setDescription(`Moderator: ${message.author.tag}/nReason: ${reason1}`)
    .setColor("RANDOM")
    .setFooter(message.guild.name, message.guild.iconURL())

    const example = new Discord.MessageEmbed()
    .setDescription(`Pls mention the user.`)

    const example3 = new Discord.MessageEmbed()
    .setDescription(`You cant ban yourself!`)

    const example4 = new Discord.MessageEmbed()
    .setDescription(`You cant ban me!`)

    if (!user) return message.channel.send(`mention the user first!`);
    if (user.id === message.author.id) return message.channel.send(`You can't ban yourself!`);
    if (user.id === client.user.id) return message.channel.send(`You can't ban a bot`);
    if (!reason1) return message.channel.send(`Please try again with the reason!`);

    member.ban({reason: reason1}).then(() => {
        const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle("Successfully banned!")
        .setDescription(`**Moderator:** ${message.author.tag}\n**Banned:** ${user.tag}\n**Reason:** ${reason1}`)
        .setColor("RANDOM")
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(embed);
        user.send(DMs)
    }).catch(err => {
        message.channel.send("I was unable to ban the user.");
    })
}

exports.help = {
    name: "ban",
    description: "Ban the rules breaker!",
    usage: [`${config.prefix}ban <Mentioned member> [Reason]`],
    example: [`${config.prefix}ban @Greblue Stupid spammer..`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}