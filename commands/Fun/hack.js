const Discord = require("discord.js")
const darkemail = require('random-email');
const darkpassword = require('generate-password'); 

exports.run = async (client, message, args) => {
    const hacke = new Discord.MessageEmbed()
    const user = message.mentions.users.first();
    if (!user) {
        return message.channel.send(`Mention the user!`);
    }
    const impostorpassword = darkpassword.generate({
        length: 10,
        numbers: true,
    });
    const member = message.guild.member(user);
    const mostCommon = ["bloop", "beep", "boop"];
    const lastdm = [
    ];
    message.channel
        .send(hacke.setColor(0x7289DA).setTitle(`Hacking ${member.user.username} now...`))
        .then(async (msg) => {
            setTimeout(async function () {
                await msg.edit(hacke.setColor(0x7289DA).setDescription(`[▘] Finding discord login... (2fa bypassed)`));
            }, 1000);
            setTimeout(async function () {
                await msg.edit(hacke.setColor(0x7289DA).setDescription(
                    `[▝] Email: \`${darkemail({
                        domain: "gmail.com",
                    })}\`\nPassword: \`${impostorpassword}\``
                ));
            }, 3000);
            setTimeout(async function () {
                await msg.edit(hacke.setColor(0x7289DA).setDescription(
                    `[▖] Last DM: "${lastdm[Math.floor(Math.random() * lastdm.length)]}"`
                ));
            }, 7000);
            setTimeout(async function () {
                await msg.edit(hacke.setColor(0x7289DA).setDescription(`[▘] Finding most common word...`));
            }, 9000);
            setTimeout(async function () {
                await msg.edit(hacke.setColor(0x7289DA).setDescription(
                    `[▝] "${mostCommon[Math.floor(Math.random() * mostCommon.length)]
                    }"`
                ));
            }, 11000);
            setTimeout(async function () {
                await msg.edit(hacke.setColor(0x7289DA).setDescription(`[▗] Finding IP address...`));
            }, 21000);
            setTimeout(async function () {
                await msg.edit(hacke.setColor(0x7289DA).setDescription(
                    `[▖] IP address: \`127.0.0.1:5\``
                ));
            }, 23000);
            setTimeout(async function () {
                await msg.edit(hacke.setColor(0x7289DA).setDescription(`[▘] Selling data to the Government...`));
            }, 25000);
            setTimeout(async function () {
                await msg.edit(hacke.setColor(0x7289DA).setDescription(`[▝] Reporting account to discord for breaking ToS...`));
            }, 27000);
            setTimeout(async function () {
                await message.channel.send(hacke.setColor(0x7289DA).setDescription(
                    `The *totally*  real and dangerous hack is complete`
                ));
            }, 34000);
        });
}

exports.help = {
    name: "hack",
    description: "Hack some user! (Fake hacking)",
    usage: "hack <Mentioned user>",
    example: "hack @Greblue"
}

exports.conf = {
    aliases: [],
    cooldown: 5
}