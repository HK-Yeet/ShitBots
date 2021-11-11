const Discord = require("discord.js");

module.exports = (bot) => {
  bot.on("message", async (message) => {
    if (message.channel.id == "788121558777987072") {
      await message.react("788819319579607041");
      await message.react("788819220061880340");
    }
  });
  bot.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.channel.id == "788121558777987072") {
      if(reaction.message.partial) await reaction.message.fetch()
      if(reaction.message.author.id == user.id){
        reaction.users.remove(user);
      }
    }
  })
};
