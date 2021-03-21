const Discord = require("discord.js");
const config = require("./config.json")
const Client = require("./handler/ClientBuilder.js");

const client = new Client();

const alexa = require('alexa-bot-api');
let ai = new alexa("aw2plm");
const db = require('quick.db');

const fetch = require('node-fetch');

require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.package = require("./package.json");
client.on("warn", console.warn);
client.on("error", console.error);

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', async message => {
  if (message.author.bot) return;

  const prefix = config.prefix
  let args = message.content.slice(0).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();

  let cmdx = db.get(`cmd_${message.guild.id}`)

if(cmdx) {
  let cmdy = cmdx.find(x => x.name === cmd)
  if(cmdy) message.channel.send(cmdy.responce)
}

  if (message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(`Hello ${message.author}, my prefix is **${config.prefix}**\nYou can start by typing **${config.prefix}help**, it's will show you a list of **<@${client.user.id}>**'s commands`);
  }

  let afk = new db.table("AFKs"),
    authorStatus = await afk.fetch(message.author.id),
    mentioned = message.mentions.members.first();

  if (mentioned) {
    let status = await afk.fetch(mentioned.id);

    if (status) {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${mentioned.user.tag} is AFK!\nReason: ${status}`)
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
      message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
    }
  }

  if (authorStatus) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`${message.author.tag} are no longer AFK.`)
      .setTimestamp()
      .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
    afk.delete(message.author.id);
  }

  //    if (message.channel.id === '822704783231680573') {
  if (config.channels.includes(message.channel.id)) {
    fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}%20there!&uid=${message.author.id}`)
      .then(response => response.json())
      .then(data => {
        message.reply(data.response)
      })
  }

});

client.login(config.token);