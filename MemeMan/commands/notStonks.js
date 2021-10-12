const Discord = require('discord.js')
const config = require('../database/config.json')

module.exports = {
    name: "notstonks",
    description: "not so stonks",

    async run(client, message, args) {

        if (!message.member.roles.cache.has(config.guildOfGlizzy))return

        message.delete();
        message.channel.send("", { files: ['./images/notStonks.jpg'] })


    }
}