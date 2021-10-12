const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "test command",

    async run(client, message, args) {

        message.channel.send(`Pinging...`).then((msg) => {
            const pingEmbed = new Discord.MessageEmbed()
                .setTitle("🏓 Pong!")
                .setDescription(
                    `Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`
                )
                .setColor("RED");
            msg.edit(pingEmbed);
            msg.edit("\u200B");
        });


    }
}