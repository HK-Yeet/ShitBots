const Discord = require("discord.js");
const usersMap = new Map();
const muted = "792178101345321001";
const limit = 10,
  timeout = 10000,
  diff = 5000,
  muteTime = 3600000;

module.exports = (bot) => {
  bot.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;

    if (usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference =
        message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      if (difference > diff) {
        clearTimeout(timer);
        userData.lastMessage = message;
        userData.msgCount = 1;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, timeout);
        usersMap.set(message.author.id, userData);
      } else {
        ++msgCount;
        if (parseInt(msgCount) >= limit) {
          message.member.roles.add(muted);
          bot.quickEmbed(
            message.channel,
            "Shut",
            `${message.author} has been muted for 1 hour`,
            null
          );
          setTimeout(() => {
            message.member.roles.remove(muted);
            bot.quickEmbed(
              message.channel,
              "Unshut",
              `${message.author} has been unmuted`,
              null
            );
          }, muteTime);
        } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
        }
      }
    } else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, timeout);
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn,
      });
    }
  });
};
