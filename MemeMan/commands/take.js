const Discord = require('discord.js')
const fs = require('fs')
const money = JSON.parse(fs.readFileSync("./database/money.json"))

module.exports = {
    name: "take",
    description: "test command",

    async run(client, message, args) {

        if (!message.member.roles.cache.has('749461538066268182')) return message.reply("You can't use this command!")

        var user = message.mentions.members.first()

        if (!user) return message.reply("You have to take the money from *someone*")

        if (!money[user.id]) {

            money[user.id] = {
                name: bot.users.cache.get(user.id).tag,
                money: 0
            }
            fs.writeFile('./money.json', JSON.stringify(money), (err) => {
                if (err) console.log(err)
            })
        }

        let amount = args[1]

        if (!amount) return message.reply("You gotta take *something*.")
        if (isNaN(amount)) return message.reply("The amount parameter isn't a number!");

        money[user.id].money -= parseInt(amount)
        fs.writeFile('./money.json', JSON.stringify(money), (err) => {
            if (err) console.log(err)
        })
        message.reply(`Money go poof`)

    }


}
