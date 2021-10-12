const Discord = require('discord.js')
const fs = require('fs')
const money = JSON.parse(fs.readFileSync("./database/money.json"))

module.exports = {
    name: "add",
    description: "test command",

    async run(client, message, args) {

        if (!message.member.roles.cache.has('749461538066268182')) return message.reply("You can't use this command!")

        let amount = args[0]

        if (!amount) return message.reply("You gotta add *something*.")
        if (isNaN(amount)) return message.reply("The amount parameter isn't a number!");

        money[message.author.id].money += parseInt(amount)
        fs.writeFile('./money.json', JSON.stringify(money), (err) => {
            if (err) console.log(err)
        })
        message.reply(`You got the goods.`)

    }
}