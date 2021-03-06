const config = require("../../config.json")
const Discord = require("discord.js")
const weather = require("weather-js");

exports.run = async (client, message, args) => {
    let messageArray = message.content.split(" ")
    let args1 = messageArray.slice(1);
    let args2 = message.content.substring(message.content.indexOf(' ')+1);
    let city = args1.join(" ");
    let degreetype = "C"; // You can change it to F. (fahrenheit.)

    await weather.find({search: city, degreeType: degreetype}, function(err, result) {
        if (!city) return message.channel.send(`Try again with the city name!`);
        if (err || result === undefined || result.length === 0) return message.channel.send(`Unknown city, Pls try again..`);

        let current = result[0].current;
        let location = result[0].location;

        const embed = new Discord.MessageEmbed()
        .setAuthor(current.observationpoint)
        .setDescription(`> ${current.skytext}`)
        .setThumbnail(current.imageUrl)
        .setTimestamp()
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")

        embed.addField(`Weather Informations`, `Latitude: ${location.lat}\nLongitude: ${location.long}\nFeels like: ${current.feelslike}°C\nDegree type: ${location.degreetype}\nWinds: ${current.winddisplay}\nHumidity: ${current.humidity}\nTimezone: GMT ${location.timezone}\nTemperature: ${current.temperature}°C\nObservation time: ${current.observationtime}`)

        return message.channel.send(embed);
    })
}

exports.help = {
    name: "weather",
    description: "How's the weather in your city?",
    usage: [`${config.prefix}weather <City name>`],
    example: [`${config.prefix}weather Calgary`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}