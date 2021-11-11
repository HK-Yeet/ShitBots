module.exports = (bot) => {
  bot.on("message", async (message) => {
    try {
      if (message.channel.type == "news") {
        await message.crosspost();
        message.react("📣");
      }
    } catch (error) {}
  });
};
