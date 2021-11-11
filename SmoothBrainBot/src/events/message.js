const Discord = require("discord.js");
const humanize = require("humanize-duration");
const cooldowns = new Discord.Collection();

module.exports = (bot, message) => {
  // ignore dms and messages that are from bots
  if (message.author.bot || message.channel.type == "dm") return;

  //check for prefix
  const mentionRegexPrefix = RegExp(`^<@!?${bot.user.id}>`);
  if (!message.content.toLowerCase().match(mentionRegexPrefix)) return;
  const prefix = message.content.toLowerCase().match(mentionRegexPrefix)[0];
  if (!message.content.toLowerCase().startsWith(prefix)) return; //if message doesn't start with prefix
  if (message.content == prefix) return; //if just a bot ping, ignore
  const args = message.content.slice(prefix.length).trim().split(/ +/); //trim
  const commandName = args.shift().toLowerCase(); //get command name
  const command = bot.commands.get(commandName) || bot.aliases.get(commandName); //find command
  if (!command) return;

  //get bots nickname for server
  const botNick = message.guild.members.cache.get(bot.user.id).nickname || bot.user.username;

  console.log("Hi again");

  if (
    args.length < command.config.min ||
    (args.length > command.config.max && command.config.max > 0)
  ) {
    return bot.quickEmbed(
      message.channel,
      "Invalid Syntax",
      `Try using:\n\`${
        command.config.usage
          ? `@${botNick} ${commandName} ${command.config.usage}`
          : `${botNick} ${commandName}`
      }\``,
      true
    );
  }

  //checks if user have permission to use this command
  let { permissions } = command.config;
  if (permissions) {
    let hasPermission = true;
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    for (const permission of permissions) {
      if (!message.member.hasPermission(permission)) {
        hasPermission = false;
        return bot.quickEmbed(
          message.channel,
          null,
          `You do not have permission to use this command\n\nRequired Permissions: \`${permissions
            .join(", ")
            .replace(/_/g)}\``,
          true
        );
      }
      if (hasPermission) {
        continue;
      }
    }
  }

  //checks for cooldowns & sets cooldown
  if (!cooldowns.has(command.help.name)) {
    cooldowns.set(command.help.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.help.name);
  const cooldownAmount = (command.config.cooldown || 3) * 1000;

  //checks if user has cooldown
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime && !config.devs.includes(message.author.id)) {
      const remaining = humanize(expirationTime - now, {
        delimiter: " and ",
        maxDecimalPoints: 1,
      });

      return bot.quickEmbed(
        message.channel,
        "Whoa there",
        `Slow down there buddy! Please wait \`${remaining}\` before using ${command.help.name}`,
        true
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.run(bot, message, args);
  } catch (error) {
    console.log(error);
    return bot.quickEmbed(message.channel, null, `${error}`, true);
  }
};
