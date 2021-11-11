const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let emoji = message.guild.emojis.cache.find((emoji) =>
    emoji.name.includes(args[0])
  );
  if (!emoji)
    bot.quickEmbed(
      message.channel,
      null,
      `Could not find any emoji called ${args[0]}`
    );
  if (emoji.animated) {
    bot.quickEmbed(
      message.channel,
      "Emoji",
      `\`<a:${emoji.name}:${emoji.id}>\``,
      null
    );
  } else {
    bot.quickEmbed(
      message.channel,
      "Emoji",
      `\`<${emoji.name}:${emoji.id}>\``,
      null
    );
  }
};
exports.help = {
  name: "yoink",
  description: "Emoji ID",
  aliases: [""],
};
exports.config = {
  min: 0,
  max: -1,
  usage: ``,
  cooldown: 0,
  permissions: ["ADMINISTRATOR"],
  delete: false,
};
