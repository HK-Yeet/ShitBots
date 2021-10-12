const Discord = require('discord.js')

module.exports = {
    name: "ban",
    description: "ban member",

    async run(client, message, args) {

        const user = message.mentions.users.first();
        if (!message.member.hasPermission("BAN_MEMBERS"))return message.reply("You don't have permission to do this.")
        if (!user) return message.reply("You didn't specify someone to ban.")

        const member = message.guild.member(user);

        if(member.hasPermission("MANAGE_MESSAGES"))return message.reply("You can't ban a mod.")

        var reason = args.slice(1).join(" ")

        if(!reason)return message.reply("Please provide a reason.")

        await member.send(`You have been banned from **${message.guild.name}**. Reason: ${reason}`).catch(console.error)

        member.ban(reason).then(() => { message.reply(`Successfully kicked ${user.tag}`); }).catch(err => message.channel.send("Hmmmm... something bad happened."))

    }
}