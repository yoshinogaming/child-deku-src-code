const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
  let prefix = client.config.prefix;
  
  if (!args[0]) {
    // This will turn the folder (category) into array.
    let module = client.helps.array();
    
    // This will hide a folder from display that includes "hide: true" in their module.json
    if (!client.config.owners.includes(message.author.id)) module = client.helps.array().filter(x => !x.hide);
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setDescription(`➔ Prefix: ${config.prefix}\n➔ Do you want to invite me? [Click here](https://discord.com/api/oauth2/authorize?client_id=716278759019511871&permissions=8&scope=bot)\n➔ Join the community! [Click here](https://discord.gg/rveCu4yZVq)\n➔ Check out our website [Click here](https://greblue.github.io/child-deku)\n➔ Type \`${prefix}help [Command_Name]\` to get more specific information about the command.`)
    .setAuthor(`${client.user.username}'s Help menu`, client.user.displayAvatarURL())
    
    for (const mod of module) {
      // You can change the .join(" | ") to commas, dots or every symbol.
      embed.addField(`${mod.name}`, mod.cmds.map(x => `\`${x}\``).join(", "));
    }
    
    return message.channel.send(embed);
  } else {
    let cmd = args[0];
    
    // If the user type the [command], also with the aliases.
    if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      let name = command.help.name; // The command name.
      let desc = command.help.description; // The command description.
      let cooldown = command.conf.cooldown + " second(s)"; // The command cooldown.
      let aliases = command.conf.aliases.join(", ") ? command.conf.aliases.join(", ") : "No aliases provided.";
      let usage = command.help.usage ? command.help.usage : "No usage provided.";
      let example = command.help.example ? command.help.example : "No example provided.";
      
      let embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .setTitle(name)
      .setDescription(desc)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter("[] optional, <> required. Don't includes these things while typing a command.")
      .addField("Usage", usage)
      .addField("Cooldown", "Coming soon!", true)
      .addField("Aliases", aliases, true)
      .addField("Example", example, true)
      
      return message.channel.send(embed);
    } else {
      // If the user type the wrong command.
      return message.channel.send({embed: {color: "RED", description: "Unknown command."}});
    }
  }
}

exports.help = {
  name: "help",
  description: "Show a command list.",
  usage: `${config.prefix}help [command]`,
  example: `${config.prefix}help ban`
}

exports.conf = {
  aliases: ["?"],
  cooldown: 1
}
