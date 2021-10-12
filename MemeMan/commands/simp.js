module.exports = {
    name: "simp",
    description: "Checks out how simp you are",

    async run(client, message, args) {

        if (!args[0]) {
            var user = message.author;
        } else {
            var user = message.mentions.members.first()
        }

        if (!args[0]) {
            let random5050 = Math.floor(Math.random() * 2)
            if (random5050 === 1) {
                message.channel.send(`Checking your dm's`)
                    .then(msg => {
                        setTimeout(function () {
                            msg.edit(`Woah...`)
                        }, 3000);
                        setTimeout(function () {
                            msg.edit(`${message.author} is ${[Math.floor(Math.random() * (100 - 50) + 50)]}% simp.`)
                        }, 5000)
                    })
            } else {
                message.channel.send("Checking your dm's...").then(msg => { setTimeout(function () { msg.edit(`${message.author} is ${[Math.floor(Math.random() * 50)]}% simp.`) }, 5000) })
            }
        } else if (args[0]) {
            let random5050 = [Math.floor(Math.random() * 11)]
            if (random5050 % 2 === 0) {
                message.channel.send(`Checking their dm's`)
                    .then(msg => {
                        setTimeout(function () {
                            msg.edit(`<:um:749783524923408444> Woah...`)
                        }, 3000);
                        setTimeout(function () {
                            msg.edit(`${user} is ${[Math.floor(Math.random() * (100 - 50) + 50)]}% simp.`)
                        }, 5000)
                    })
            } else {
                message.channel.send("Checking their dm's...").then(msg => { setTimeout(function () { msg.edit(`${user} is ${[Math.floor(Math.random() * 50)]}% simp.`) }, 5000) })
            }
        }

    }
}