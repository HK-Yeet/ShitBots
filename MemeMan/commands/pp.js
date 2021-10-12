const Discord = require('discord.js')

module.exports = {
    name: "pp",
    description: "Checks how big your pp id",

    async run(client, message, args) {

        if (!args[0]) {
            message.channel.send("🔍Taking a look...").then(msg => { setTimeout(function () { msg.edit(`${message.author}'s pp is ${Math.round(Math.random() * 10)} inches long`) }, 3000) })
        } else {
            message.channel.send("🔍Taking a look...").then(msg => { setTimeout(function () { msg.edit(`${user}'s pp is ${Math.round(Math.random() * 10)} inches long`) }, 3000) })
        }

    }
}