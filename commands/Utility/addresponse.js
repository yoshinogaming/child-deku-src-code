const Discord = require('discord.js');
const config = require('../../config.json');

const db = require('quick.db');;

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Hello ${message.author}, you need **Manage Messages** permission to run this command!`)

    let cmdname = args[0]

    if (!cmdname) return message.channel.send(`Try again with the trigger text!`)

    let cmdresponce = args.slice(1).join(" ")

    if (!cmdresponce) return message.channel.send(`You have to give the trigger response!`)

    let database = db.get(`cmd_${message.guild.id}`)

    if (database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send("This custom response is already addded into this server!")

    let data = {
        name: cmdname.toLowerCase(),
        responce: cmdresponce
    }

    db.push(`cmd_${message.guild.id}`, data)

    return message.channel.send("Added **" + cmdname.toLowerCase() + "** into this server!")

}

exports.help = {
    name: "add-response",
    description: "add some custom response into your server!",
    usage: [`${config.prefix}add-response [Trigger] [Response]`],
    example: [`${config.prefix}add-response Hi Hello`]
}

exports.conf = {
    aliases: ["a-r"],
    cooldown: 10
}