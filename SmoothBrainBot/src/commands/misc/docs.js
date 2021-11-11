const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (bot, message, args) => {
  const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
    args
  )}`;

  axios
    .get(uri)
    .then((embed) => {
      const { data } = embed;

      if (data && !data.error) {
        message.channel.send({ embed: data });
      } else {
        bot.quickEmbed(
          message.channel,
          null,
          `Could not find that documentation ${message.author}`,
          true
        );
        message.channel.send();
      }
    })
    .catch((err) => {});
};
exports.help = {
  name: "docs",
  description: "Search the docs",
};
exports.config = {
  min: 1,
  max: -1,
  usage: "<something to search>",
  cooldown: 0,
  permissions: ["SEND_MESSAGES"],
  delete: false,
};
