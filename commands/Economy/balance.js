const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    } else {
        user = message.author;
    }

    if (user.bot || user === client.user) {
        return message.channel.send("This user is a bot.");
        // If the user was a bot, ignore it.
    }

    let balance = db.get(`account.${user.id}.balance`);
    if (!balance) balance = 0;
    else balance = balance;

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`Balance of ${user.username}`)
    .addField("Total Balance:", `${(balance).toLocaleString()} :dollar:`)
    .setThumbnail(user.displayAvatarURL({size: 4096, dynamic: true}))
    .setTimestamp() // Optional :)
    return message.channel.send(embed);
}

exports.help = {
    name: "balance",
    description: "Checking yours, or other members money.",
    usage: "balance [Mentioned user]",
    example: "balance @Greblue"
}
  
exports.conf = {
    aliases: ["bal", "money", "credit"],
    cooldown: 1
}