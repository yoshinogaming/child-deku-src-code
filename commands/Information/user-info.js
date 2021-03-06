const moment = require('moment');
const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message) => {
    let messageArray = message.content.split(" ")
    let args = messageArray.slice(1);
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.author; // You can do it by mentioning the user, or not.

    if (user.presence.status === "dnd") user.presence.status = "<:dnd:742557115876638762> | Do not disturb.";
    if (user.presence.status === "idle") user.presence.status = "<:idle:742557093432655905> | Idle.";
    if (user.presence.status === "offline") user.presence.status = "<:offline:742557131026464768> | Offline.";
    if (user.presence.status === "online") user.presence.status = "<:online:742557148730359819> | Online.";
// <:online:742557148730359819> <:offline:742557131026464768> <:idle:742557093432655905> <:dnd:742557115876638762>
    function game() {
      let game;
      if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
      else if (user.presence.activities.length < 1) game = "The User Is Not Playing a Game!"; // This will check if the user doesn't playing anything.
      return game; // Return the result.
    }

    let x = Date.now() - user.createdAt; // Since the user created their account.
    let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt; // Since the user joined the server.
    let created = Math.floor(x / 86400000); // 5 digits-zero.
    let joined = Math.floor(y / 86400000);

    const member = message.guild.member(user);
    let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "No nickname.."; // Nickname
    let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Created Date
    let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Joined the Server Date
    let status = user.presence.status; // DND, IDLE, OFFLINE, ONLINE
    let avatar = user.avatarURL({dynamic: true, size: 2048}); // Use 2048 for high quality avatar.

    const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, avatar)
    .setThumbnail(avatar)
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Username", `${user.tag}`, true)
    .addField("User ID", user.id, true)
    .addField("Nickname", nickname, true)
    .addField("Account created since", `${createdate} \n> ${created} day(s) ago`, true)
    .addField("Joined this server since", `${joindate} \n> ${joined} day(s) ago`, true)
//    .addField("User Status", status, true)
    .addField("Roles", `<@&${member._roles.join('> | <@&')}>`, true)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed);
}

exports.help = {
    name: "user-info",
    description: "Let the bot show you the information of some user or yourself",
    usage: [`${config.prefix}user-info`],
    example: [`${config.prefix}user-info @Greblue`]
}
  
  exports.conf = {
    aliases: ["u-i"],
    cooldown: 1
}