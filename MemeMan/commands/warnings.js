const Discord = require('discord.js')
const fs = require('fs')
const warns = JSON.parse(fs.readFileSync("./database/warnings.json"))

module.exports = {
    name: "warnings",
    description: "shows warnings",
    aliases: [""],

    async run(client, message, args) {

        if (!args[0]) {
            var user = message.author;
        } else {
            var user = message.mentions.members.first()
        }
        if (!warns[user.id]) {

            return message.channel.send(`${client.users.cache.get(user.id).username} has 0 warnings.`)
            
        }

        return message.channel.send(`${client.users.cache.get(user.id).username} has ${warns[user.id].warns} warnings.`)


    }
}