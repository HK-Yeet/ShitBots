const Discord = require('discord.js')
const ms = require("ms");
const config = require('../database/config.json')

module.exports = {
    name: "mute",
    description: "mute command",

    async run(client, message, args) {

        try {

            let tomute = message.guild.member(message.mentions.users.first());
            if(!tomute) return message.reply("You gotta mute someone.")

            if (tomute.roles.cache.has(config.muted)) return message.reply("They're aready muted.")

            if (!tomute) return message.reply("Couldn't find user.");
            if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
            let mutetime = args[1];
            if (!mutetime) return message.reply("You didn't specify a time!");

            tomute.roles.add(config.muted)
            message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

            setTimeout(function () {
                tomute.roles.remove(config.muted);
                message.channel.send(`<@${tomute.id}> has been unmuted!`);
            }, ms(mutetime));


        } catch (e) {

            console.error(e)

        }


    }
}