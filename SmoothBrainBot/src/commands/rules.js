const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  if (!args.length) {
    let rulesEmbed = new Discord.MessageEmbed()
      .setTitle("**Server Rules**")
      .setColor("BLUE")
      .setDescription(
        "────────\n\n1. Follow Discord TOS\n\n❯ We have to adhere by the [Discord TOS](https://discord.com/terms) and [Discord Community Guidlines](https://discord.com/guidelines) and enforce it, for your own safety and the servers. We strongly urge you to follow it.\n\n────────\n\n2. Be Respectful\n\n❯ Respect is a requirement, any sort of toxicity, creation of drama, discriminatory speech (racism, sexism, homophobia, etc.), will be punishable, depending on the severity of the act.\n\n────────\n\n3. No Advertising\n\n❯ Just as simple as that. Don't advertise your stuff.\n\n────────\n\n4. Listen and cooperate with staff.\n\n❯ Do not argue about staff decision, if you have a complaint or want to dispute a decision please message a manager or an administrator.\n\n────────\n\n5. Put things in the correct channels.\n\n❯ Just please put things in the correct channels. It's not that hard.\n\n────────\n\n6. Please do not spam.\n\n❯ This includes flooding the chat with bot commands, typing, images, music commands, etc.\n\n────────"
      )
      .setFooter("- Smooth Brain Devs");
    message.channel.send(rulesEmbed);
  }
  if (args[0] == "verify") {
    let verifyEmbed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        "Once you have read our rules, click on the reaction below to become verified and gain access to the rest of the server. If the bot doesn't give you the verified role, dm any staff member!"
      );
    message.channel.send(verifyEmbed);
  }
  if (args[0] == "how") {
    let info = new Discord.MessageEmbed()
      .setColor("PURPLE")
      .setDescription("Click on the reaction in <#741160557062914078> to make sure you are a bot :)");
    message.channel.send(info);
  }
};
exports.help = {
  name: "rules",
  description: "You should know",
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
