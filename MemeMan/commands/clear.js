module.exports = {
    name: "clear",
    description: "clear command",

    async run(client, message, args) {

        try {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {

                let amount = args[0]
        
                if (!amount) return message.reply("You gotta tell me something to delete");
                if (isNaN(amount)) return message.reply("The amount parameter isn't a number!");
                if (amount % 1 != 0) return message.reply("The amount parameter isn't a whole number!")
        
                if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!');
                if (amount < 1) return message.reply('You have to delete at least 1 message!');
        
                message.channel.bulkDelete(amount)
        
                const m = message.channel.send("Deleted " + amount + " messages.")
            }else if(message.member.hasPermission("MANAGE_MESSAGES")){

                message.reply("You need to be a mod to use this.")
                return

            }
        
        } catch (error) {
            console.error(error)
            message.channel.send("Uh oh, Stinky.")
        }

    }
}