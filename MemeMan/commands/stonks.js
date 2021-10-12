const Discord = require('discord.js')
const config = require('../database/config.json')

module.exports = {
    name: "stonks",
    description: "stonk command",

    async run(client, message, args) {

        if (!message.member.roles.cache.has(config.guildOfGlizzy))return

        message.delete();
        message.channel.send("", { files: ['./images/stonks.jpg'] })


    }
}