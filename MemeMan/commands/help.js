const Discord = require('discord.js')
const { Menu } = require('discord.js-menu');

module.exports = {
    name: "help",
    description: "help dashboard",

    async run(client, message, args, prefix) {

        message.delete()

        new Menu(message.channel, message.author.id, [
            {
                name: "main",
                content: new Discord.MessageEmbed({
                    title: "Help Menu",
                    color:"#a438d6",
                    description: "Welcome to the Help Menu. Use the reactions to go get around this menu.",
                    fields: [
                        {
                            name: "Server Prefix",
                            value: prefix
                        },
                        {
                            name: "Glizzy Commands",
                            value: "Page 2"
                        },{
                            name: "Music Commands",
                            value: "Page 3"
                        },{
                            name: "Misc Commands",
                            value: "Page 4"
                        },{
                            name: "Moderation Commands",
                            value: "Page 5"
                        }
                    ],
                    footer: {
                        text: 'Custom Bot Made By HK#4784',
                    },
                }),
                reactions: {
                    "❌": "stop",
                    "2️⃣": "Page 2",
                    "3️⃣": "Page 3",
                    "4️⃣": "Page 4",
                    "5️⃣": "Page 5",
                }
            },
            {
                name: "Page 2",
                content: new Discord.MessageEmbed({
                    title: "Glizzy Commands",
                    color:"#a438d6",
                    description: "Commands Exclusive to the Guild Of Glizzy",
                    fields: [
                        {
                            name: "stonks",
                            value: "Sends stonks meme"
                        },{
                            name: "notstonks",
                            value: "Sends not stonks meme"
                        },{
                            name: "helth",
                            value: "Sends helth command"
                        }
                    ],
                    footer: {
                        text: 'Custom Bot Made By HK#4784',
                    },
                }),
                reactions: {
                    "⏮": "first",
                    "◀": "previous",
                    "❌": "stop",
                    "▶": "next",
                    "⏭": "last",
                }
            },
            {
                name: "Page 3",
                content: new Discord.MessageEmbed({
                    title: "Music Commands",
                    color:"#a438d6",
                    description: "Yes, This Bot Has Music",
                    fields: [
                        {
                            name: "play",
                            value: "plays provided youtube link"
                        },
                        {
                            name: "stop",
                            value: "stops music"
                        },
                        {
                            name: "skip",
                            value: "skips to next song in queue"
                        }
                    ],
                    footer: {
                        text: 'Custom Bot Made By HK#4784',
                    },
                }),
                reactions: {
                    "⏮": "first",
                    "◀": "previous",
                    "❌": "stop",
                    "▶": "next",
                    "⏭": "last",
                }
            },{
                name: "Page 4",
                content: new Discord.MessageEmbed({
                    title: "Misc Commands",
                    color:"#a438d6",
                    description: "Some Random Commands",
                    fields: [
                        {
                            name: "ping",
                            value: "Shows latency"
                        },
                        {
                            name: "pp",
                            value: "Shows how big your/mentioned user's pp is"
                        },
                        {
                            name: "simp",
                            value: "Shows you how simp you/mentioned user is"
                        },{
                            name: "Meme",
                            value: "Shows a meme from reddit"
                        }
                    ],
                    footer: {
                        text: 'Custom Bot Made By HK#4784',
                    },
                }),
                reactions: {
                    "⏮": "first",
                    "◀": "previous",
                    "❌": "stop",
                    "▶": "next",
                    "⏭": "last",
                }
            },{
                name: "Page 5",
                content: new Discord.MessageEmbed({
                    title: "Moderation Commands",
                    color:"#a438d6",
                    description: "Moderator Only Commands",
                    fields: [
                        {
                            name: "clear",
                            value: "Deletes given messages"
                        },
                        {
                            name: "warn",
                            value: "Warns mentioned user"
                        },
                        {
                            name: "kick",
                            value: "Kicks mentioned user"
                        },
                        {
                            name: "ban",
                            value: "Bans mentioned user"
                        }
                    ],
                    footer: {
                        text: 'Custom Bot Made By HK#4784',
                    },
                }),
                reactions: {
                    "⏮": "first",
                    "◀": "previous",
                    "❌": "stop",
                }
            }
        ]);
        
    }
}