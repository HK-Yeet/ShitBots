const Discord = require('discord.js')
const fs = require('fs')
const warns = JSON.parse(fs.readFileSync("./database/warnings.json"))

module.exports = {
    name: "warn",
    description: "warns user",

    async run(client, message, args, prefix) {

        try {

            const noModUser = new Discord.MessageEmbed()
                .setTitle("No.")
                .setColor('RED')
                .setDescription("You're a funny guy")

            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noModUser)

            if (!args[0, 1]) {
                const argsEmbed = new Discord.MessageEmbed()
                    .setTitle("Bruh")
                    .setColor('RED')
                    .setDescription("I thought a mod would know how to use this")
                return message.channel.send(argsEmbed)
            }

            let warnUser = message.guild.member(message.mentions.users.first());

            if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't warn a mod")

            if (!args[1]) return message.channel.send("Please provide a reason.")

            var reason = args.slice(1).join(" ")

            if (!warnUser) return message.channel.send("Bruh")

            if (!warns[warnUser.id]) warns[warnUser.id] = {
                name: client.users.cache.get(warnUser.id).tag,
                warns: 0,
            }

            warns[warnUser.id].warns++
            warns[warnUser.id].name = client.users.cache.get(warnUser.id).tag

            fs.writeFile("./database/warnings.json", JSON.stringify(warns), (err) => {
                if (err) console.log(err)
            })

            const warnembed = new Discord.MessageEmbed()
                .setTitle("Warned")
                .setColor('RED')
                .setTimestamp()
                .setDescription(`User: ${warnUser} (${warnUser.id}) \n By: ${message.author}\nReason: ${reason}\n Warning #: ${warns[warnUser.id].warns}`)
            message.channel.send(warnembed)


        } catch (error) {

            console.error(error)

        }


    }
}