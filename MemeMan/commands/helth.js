const Discord = require('discord.js')
const config = require('../database/config.json')

module.exports = {
    name: "helth",
    description: "helth meme",

    async run(client, message, args) {

        if (!message.member.roles.cache.has(config.guildOfGlizzy))return

        message.delete();
        message.channel.send("", { files: ['./images/helth.jpg'] })


    }
}