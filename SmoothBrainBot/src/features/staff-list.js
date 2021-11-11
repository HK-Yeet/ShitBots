const Discord = require("discord.js")

module.exports = (bot) => {
  bot.on("ready", async () => {
      setInterval(async function() {
        const msg = await bot.channels.cache.get("794983108625432587").messages.fetch("794983175578320968");
        let staffList = new Discord.MessageEmbed()
          .setTitle("Bot Developers")
          .setColor("BLUE")
          .setDescription(bot.guilds.cache.get("741157880211701803").roles.cache.find(r => r.name == "Smooth Brain").members.map(m=>`\`${m.user.tag}\``).join(', '))
        msg.edit(staffList);
      }, 10000)
  });
};
