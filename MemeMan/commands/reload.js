const Discord = require('discord.js')
const config = require('../database/config.json')

module.exports = {
    name: "reload",
    description: "test command",

    async run(client, message, args) {

        client.destroy()
        client.login(config.token);
        message.channel.send("Reloaded");
        return;

    }
}