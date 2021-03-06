const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    if(message.member.id){
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription("*Rock, Papper, Scissor.*")
        m = await message.channel.send(embed);
        await m.react("👊");
        await m.react("✋"); 
        await m.react("✌");
        let choices = {};
        await m.awaitReactions((reaction, user) => user.id === message.member.id, {max: 1, time: 60000, errors:['time','max']})
          .then(collected => {
            try{
                succes = collected.get("👊");
                if(succes){  
                    choices[message.member.id] = "r"
                    m.delete();
                }
            }catch(err){
  
            }
            try{
                succes = collected.get("✋");
                if(succes){  
                    choices[message.member.id] = "p"
                    m.delete();
                }
            }catch(err){
  
            }
            try{
                succes = collected.get("✌");
                if(succes){  
                    choices[message.member.id] = "s"
                    m.delete();
                }
            }catch(err){
  
            }
        })
        pos = ["r","p","s"]
        choices['ai'] = pos[Math.floor((Math.random() * pos.length))];
        id = 'ai'
        pos = {"r" : "👊","p" : "✋","s" : "✌"}
        embed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> choosed: ` + pos[choices[message.member.id]] + "\n" + `${client.user.username}` + " choosed: " + pos[choices[id]])
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        switch("" + choices[message.member.id] + choices[id]){
          case 'rs':
          case 'pr':
          case 'sp':
              embed.setColor("RANDOM").setTitle("Congratulation you won!");
              message.channel.send(embed);
              break;
          case 'rp':
          case 'ps':
          case 'sr':
              embed.setColor("RANDOM").setTitle("Oh no, you lose..");
              message.channel.send(embed);
              break;
          case 'rr':
          case 'pp':
          case 'ss':
              embed.setColor("RANDOM").setTitle("Who is the winner?");
              message.channel.send(embed);
              break;
        }
      }else{
        embed = new Discord.MessageEmbed()
        .setTitle('Rock Papper Scissor')
        .setColor("RANDOM")
        .setDescription("This Command works only on Servers")
        message.channel.send(embed)
      }
}

exports.help = {
    name: "rps",
    description: "Rock-Paper-Scissor!!",
    usage: [`${config.prefix}rps`],
    example: [`${config.prefix}rps`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}