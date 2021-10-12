const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection()

const Canvas = require('canvas');

const queue = new Map();

const fs = require("fs");

const ytdl = require("ytdl-core");

const config = require('./database/config.json')
const prefix = config.prefix;

const totalMembers = '748958353346134277'


const { readdirSync } = require('fs');
const { join } = require('path');

const serverID = '745660204347031553'

const managerMessageID = '760142344560443422'
const adminMessageID = '760142393600901181'
const modMessageID = '760142447824207882'
const jrModMessageID = '760142469765005362'
const traineeMessageID = '760142475972837376'

var commandClose = false;

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on("message", async message => {

    if (message.author.bot || !message.guild) return;

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).run(client, message, args, prefix);
        } catch (error) {
            try {
                client.commands.get(command).execute(client, message, args)
            } catch (error) {
                console.error(error)
                message.channel.send("something bad happened...")
            }
        }
    }
})

client.on("message", async message => {
    if (message.author.bot) return;

    let args = message.content.slice(prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    if (message.guild) {

        if (command == "close" && message.content.startsWith(prefix)) {

            commandClose = true;

            if (message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "Modmail").id) {

                const person = message.guild.members.cache.get(message.channel.name)

                if (!person) {
                    return message.channel.send("I am Unable to close the channel and this error is coming because probaly channel name is changed.")
                }

                await message.channel.delete()

                let yembed = new Discord.MessageEmbed()
                    .setTitle("Thread Closed", client.user.displayAvatarURL())
                    .setColor("RED")
                    .setDescription("Thank you for contacting our mod team. Please note that replying beyond this point will create a new thread!")
                    .setFooter("The thread was closed by " + message.author.username)
                    .setTimestamp()
                if (args[0]) yembed.setDescription(args.join(" "))

                return person.send(yembed).catch(console.error)

            }
        } else if (command == "open" && message.content.startsWith(prefix)) {
            const category = message.guild.channels.cache.find((x) => x.name == "Modmail")

            if (!message.member.roles.cache.find((x) => x.name == "Moderation Team")) {
                return message.channel.send("You need the Moderator role to use this command")
            }

            if (isNaN(args[0]) || !args.length) {
                return message.channel.send("Please Give the ID of the person")
            }

            const target = message.guild.members.cache.find((x) => x.id === args[0])

            if (!target) {
                return message.channel.send("Unable to find this person.")
            }

            if (args[0] === '745693298613813321') {
                message.channel.send("Bruh, I can't mod mail myself.")
                return;
            }

            const channel = await message.guild.channels.create(target.id, {
                type: "text",
                parent: category.id,
                topic: "This thread was opened by **" + message.author.username + "** to make contact with " + target.user.tag
            })

            let nembed = new Discord.MessageEmbed()
                .setTitle("Info")
                .setColor("BLUE")
                .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
                .addField("Username & Tag", target.user.tag)
                .addField("Account Creation Date", target.user.createdAt)
                .addField("Opened by:", message.author.username)
            channel.send(nembed).catch(console.error)
        }
    }

    if (message.channel.parentID) {

        const category = message.guild.channels.cache.find((x) => x.name == "Modmail")

        if (message.channel.parentID == category.id) {
            let member = message.guild.members.cache.get(message.channel.name)

            if (!member) return message.channel.send('Not a valid user...')

            let lembed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} says:`)
                .setColor("RANDOM")
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)
                .setTimestamp()
            return member.send(lembed).catch(err => message.channel.send(deniedMessage))
        }


    }

    if (!message.guild) {

        const guild = await client.guilds.cache.get(config.serverID);
        if (!guild) return;

        const main = guild.channels.cache.find((x) => x.name == message.author.id)
        const category = guild.channels.cache.find((x) => x.name == "Modmail")

        if (message.attachments.size > 0) {
            message.react('❌')
            return
        }

        if (!main) {
            let mx = await guild.channels.create(message.author.id, {
                type: "text",
                parent: category.id,
                topic: "This ticket is created for helping  **" + message.author.tag + " **"
            })

            let sembed = new Discord.MessageEmbed()
                .setTitle("Message Sent")
                .setColor("GREEN")
                .setDescription("A moderator will be on their way to help you :D\n" + "Our mod mail system cannot send images.")
                .setThumbnail(client.user.displayAvatarURL())
            message.author.send(sembed).catch(console.error)

            let eembed = new Discord.MessageEmbed()
                .setTitle("Info")
                .setColor("BLUE")
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription("To close, type .close")
                .addField("Username & Tag: ", message.author.tag)
                .addField("Subject:", message.content)
                .addField("Account Created On:", message.author.createdAt)
            return mx.send(eembed).catch(console.error)
        }

        let xembed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} says:`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(message.content)
            .setTimestamp()
        main.send(xembed).catch(console.error)

    }

})

client.on("channelDelete", (channel) => {

    if (commandClose) {
        commandClose = false;
        return
    }
    if (channel.parentID == channel.guild.channels.cache.find((x) => x.name == "Modmail").id) {
        const person = channel.guild.members.cache.find((x) => x.id == channel.name)

        if (!person) return;

        let yembed = new Discord.MessageEmbed()
            .setTitle("Thread Closed")
            .setColor('RED')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("Thank you for contacting our mod team. Please note that replying beyond this point will create a new thread!")
        person.send(yembed).catch(console.error)

        commandClose = true;

    }


})

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};

client.on('guildMemberAdd', async member => {
    const channel = client.channels.cache.get('746147375785050334')
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./images/wallpaper.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to this hellhole!,', canvas.width / 2.5, canvas.height / 3.5);

    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send("", attachment);
    member.send(`Welcome to the server ${member}! Make sure you verify by clicking the checkmark in rules!`).catch(console.error);
    client.channels.cache.get(totalMembers).setName(`Members: ${member.guild.memberCount}`)

})

client.on('guildMemberRemove', member => {

    if (member.guild.id !== serverID) return;

    client.channels.cache.get(totalMembers).setName(`Members: ${member.guild.memberCount}`)
    // bot.channels.cache.get(totalMembers).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);

    const leaveMsg = [`That wasn't very cash money of you ${member}.`, `Why you do us dirty ${member}?`, `${member} just missed out. Smh.`]

    let leaveMessage = leaveMsg[Math.floor(Math.random() * leaveMsg.length)]

    client.channels.cache.get('746147375785050334').send(leaveMessage);

})

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    const serverQueue = queue.get(message.guild.id);

    if (command === (`play`)) {
        execute(message, serverQueue, args);
        return;
    } else if (command === (`skip`)) {
        skip(message, serverQueue, args);
        return;
    } else if (command === (`stop`)) {
        stop(message, serverQueue, args);
        return;
    }
});

async function execute(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.channel.send("You need to be in a voice channel to play music!");
    }

    let url = args.join(" ");
    if (!url.match(/(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/)) return message.channel.send("Please provide a valid Youtube link!");
    const songInfo = await ytdl.getInfo(args[1])
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`Added ${song.title} to queue! Requested by ${message.author.tag}`)
    }
}

client.on('guildMemberUpdate', () => {

    //management team
    client.channels.cache.get('749759825977671782').messages.fetch(managerMessageID).then(m => m.edit(new Discord.MessageEmbed({
        title: 'Manager(s)',
        description: (client.guilds.cache.get(serverID).roles.cache.get('746207390830952579').members.map(m => m.user).join('\n')),
        color: 'ORANGE'
    })));
    //Admin
    client.channels.cache.get('749759825977671782').messages.fetch(adminMessageID).then(m => m.edit(new Discord.MessageEmbed({
        title: 'Admin(s)',
        description: (client.guilds.cache.get(serverID).roles.cache.get('746206252882985071').members.map(m => m.user).join('\n')),
        color: 'YELLOW'
    })));
    //Mod
    client.channels.cache.get('749759825977671782').messages.fetch(modMessageID).then(m => m.edit(new Discord.MessageEmbed({
        title: 'Moderator(s)',
        description: (client.guilds.cache.get(serverID).roles.cache.get('746207968860569611').members.map(m => m.user).join('\n')),
        color: 'GREEN'
    })));
    //Jr Mod
    client.channels.cache.get('749759825977671782').messages.fetch(jrModMessageID).then(m => m.edit(new Discord.MessageEmbed({
        title: 'Jr Moderator(s)',
        description: (client.guilds.cache.get(serverID).roles.cache.get('757290559462178876').members.map(m => m.user).join('\n')),
        color: 'BLUE'
    })));
    //trainee
    client.channels.cache.get('749759825977671782').messages.fetch(traineeMessageID).then(m => m.edit(new Discord.MessageEmbed({
        title: 'Trainee(s)',
        description: (client.guilds.cache.get(serverID).roles.cache.get('746207972606214252').members.map(m => m.user).join('\n')),
        color: 'PURPLE'
    })));

});

function skip(message, serverQueue) {
    if (!message.member.voice.channel) return message.channel.send("You have to be in a voice channel to stop the music!");
    if (!serverQueue.songs) return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    try {
        if (!message.member.voice.channel) return message.channel.send("You have to be in a voice channel to stop the music!");
        serverQueue.songs = [];
        message.channel.send("The party is now over.")
        serverQueue.connection.dispatcher.end();
    } catch (error) {
        console.error(error)
        message.channel.send("Somethings up, and I don't like it...")
    }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Now playing: **${song.title}**!`);
}

client.on('ready', () => {
    console.log('I am ready');

    client.user.setActivity("with depression", {
        type: "STREAMING", url: "https://www.youtube.com/watch?v=Wl959QnD3lM&t=53s"
    });
    // client.user.setStatus(`idle`)

});

process.on('unhandledRejection', err => console.log(err));
client.on("error", console.error);
client.login(config.token);