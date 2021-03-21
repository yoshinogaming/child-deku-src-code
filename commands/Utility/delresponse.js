const Discord = require('discord.js');
const config = require('../../config.json');

const db = require('quick.db');

exports.run = async (client, message, args) => {

    let cmdname = args[0]

    if (!cmdname) return message.channel.send("Try again with the trigger name!`")

    let database = db.get(`cmd_${message.guild.id}`)

    if (database) {
        let data = database.find(x => x.name === cmdname.toLowerCase())

        if (!data) return message.channel.send(`There is no trigger called **${cmdname}**!`)

        let value = database.indexOf(data)
        delete database[value]

        var filter = database.filter(x => {
            return x != null && x != ''
        })

        db.set(`cmd_${message.guild.id}`, filter)
        return message.channel.send(`Successfully deleted **${cmdname}**!`)


    } else {
        return message.channel.send(`Unable to find **${cmdname}**!`)
    }
}

exports.help = {
    name: "del-response",
    description: "delete some trigger from your server!",
    usage: [`${config.prefix}del-response [Trigger]`],
    example: [`${config.prefix}del-response Hi`]
}

exports.conf = {
    aliases: ["d-r"],
    cooldown: 10
}