const Discord = require("discord.js");
const math = require("mathjs");

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send(`Please input the number.`);
  
  let resp;
  
  try {
    resp = math.evaluate(args.join(" "))
  } catch (e) {
    return message.channel.send(`Please input the correct number.`)
  }
  
  const calc = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Calculator")
  .addField(":inbox_tray: Question:", `\`\`\`js\n${args.join(' ')}\`\`\``)
  .addField(":outbox_tray: Answer:", `\`\`\`js\n${resp}\`\`\``);
  return message.channel.send(calc);
}

exports.help = {
  name: "calculate",
  description: "Get the answer for math problem.",
  usage: "calculate [number]",
  example: "calculate 5 * 10"
}

exports.conf = {
  aliases: ["calc"],
  cooldown: 5
}