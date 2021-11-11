const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  try {
    let constant = args.join("");
    if (!constant) constant = "fixError";
    let installEmbed = new Discord.MessageEmbed().setDescription(
      "```js\nconst " + constant + ' = require("basicJSKnowledge");```'
    );
    message.channel.send(installEmbed);
  } catch (error) {
    console.log(error);
  }
};
exports.help = {
  name: "learn",
  description: "You should know",
  aliases: [""],
};
exports.config = {
  min: 0,
  max: -1,
  usage: ``,
  cooldown: 0,
  permissions: ["MANAGE_MESSAGES"],
  delete: false,
};
